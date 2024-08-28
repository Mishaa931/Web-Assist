# backend/authenticator/views.py
from django.utils import timezone
from django.forms import ValidationError
from django.views import View
from django.urls import reverse_lazy
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth import views, get_user_model
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_decode
from django.views.generic.edit import CreateView
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from .serializers import *
from .models import *
from django.contrib.auth import logout
import json, subprocess
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer,NewCustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class RegisterUser(APIView):
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = CustomUserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        email = request.data.get('email')
        password = request.data.get('password')
        user=CustomUser.objects.get(email=email)
        if user:
            if user.check_password(password):
                    rf = RefreshToken.for_user(user)
                    print(rf)
                    return Response({'access_token': str(rf.access_token)}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class SearchResultView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        data = request.data.get('text')
        email = request.data.get('email')
        print(data)
        print(request.user)
        user=CustomUser.objects.get(email=email)
        print(user)
        if not data or not email:
            pass
        else:
              # Create SearchHistory object
            search_history = SearchHistory.objects.create(
                user=user,
                query=data,
                link="example.com",
            )
            print(search_history)
        objects=Result.objects.filter(title__contains=data)
        serializer=ResultSerializer(objects,many=True)
       
        return Response({'data':serializer.data}, status=status.HTTP_200_OK)
     

class SearchHistoryView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if  not email:
            return Response({'error': 'Invalid data'}, status=status.HTTP_401_UNAUTHORIZED)
     
        user_obj=CustomUser.objects.get(email=email)
        objects = SearchHistory.objects.filter(
            user=user_obj
        ).order_by('-timestamp') 
        print(search_history)
        serializer=SearchHistorySerializer(objects,many=True)
    
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        
class createSerchHistory(APIView):
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        query = request.data.get('query')
        link = request.data.get('link')
        print(link,query)
       
        email = request.data.get('email')
        user_obj=CustomUser.objects.get(email=email)
        data={
            'query':query,
            'link':link,
            'user':user_obj,
            
        }
        obj=SearchHistory.objects.create(link=link,query=query,user=user_obj)
        obj.save()
        # serializer = SearchHistorySerializer(data=data)
        # if obj.is_valid():
        #     obj.save().save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        
        # return Response(status=status.HTTP_400_BAD_REQUEST)

def SignupView(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = CustomUser.objects.get(email=email)
            if user:
                messages.error(request, 'The email you entered already exists.')
        except CustomUser.DoesNotExist:
            user = CustomUser.objects.create_user(first_name=first_name, last_name=last_name, username=email, email=email, password=password)
            user.save()
            
            # Generate activation link
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = default_token_generator.make_token(user)
            activation_link = request.build_absolute_uri(reverse_lazy('activate_account', args=[uid, token]))

            # Send activation email
            subject = 'Activate your account'
            message = render_to_string('emails/signup_email.html', {
                'user': user,
                'activation_link': activation_link,
            }, using='django')
            send_mail(subject, message, 'from@example.com', [user.email])
            messages.success(request, 'Your account has been created successfully. Check your email for activation instructions.')
    return render(request, 'registration/signup.html')





@login_required
def activate_account(request, uid, token):
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = get_user_model().objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        if user.is_active:
            messages.success(request, 'Your account is already activated. You can sign in.')
        else:
            user.is_active = True
            user.save()
            messages.success(request, 'Your account has been activated. You can now sign in.')
        return redirect('login')
    else:
        messages.error(request, 'Invalid activation link. Please contact support.')
        return redirect('login')




@method_decorator(login_required, name='dispatch')
class HomeView(View):
    def get(self, request):
        return render(request, 'home/homepage.html')


class PasswordResetCompleteView(views.PasswordResetCompleteView):
    def get(self, *args, **kwargs):
        return redirect(reverse_lazy('login'))
    
# @api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def PerformSearch(query):
    print('yess')
    try:
        node_output = subprocess.check_output(['node', 'authenticator\scrapper.mjs', query])
        node_output = node_output.decode('utf-8')
        print(node_output)
        results = json.loads(node_output)
        return results
    except subprocess.CalledProcessError as e:
        print(f'Error running Node.js script: {e}')
        return []


from django.views.decorators.csrf import csrf_exempt
from .filter import *
def search(request, query):
    try:
        print('*********')
        results = PerformSearch(query)
        fi = Filter(results)
        filtered = fi.filter()

        # Assuming you want 10 results per page
        results_per_page = 10
        page = int(request.GET.get('page', 1))

        start_idx = (page - 1) * results_per_page
        end_idx = start_idx + results_per_page
        paginated_results = results[start_idx:end_idx]

        total_results = len(results)
        total_pages = (total_results + results_per_page - 1) // results_per_page

        response_data = {
            'results': paginated_results,
            'total_pages': total_pages,
        }

        print(request.user)

        # Save search history
        # for result in results:
        #     SearchHistory.objects.create(query=query, link=result['url'], user=request.user)

        return JsonResponse(response_data, safe=False)

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def search_history(request):
    print('hello')
    
    try:
        email=request.GET.get('email')
     
        print(request.GET.get('email'))
    
        user_obj=CustomUser.objects.get(email=email)
        

        dataa=SearchHistory.objects.filter(user=user_obj).order_by('-timestamp') 
        serializer = SearchHistorySerializer(dataa, many=True)
        

        return JsonResponse({'data':serializer.data}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=500)


