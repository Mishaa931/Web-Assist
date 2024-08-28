# backend/backend/authenticator/urls.py
from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView

urlpatterns = [
    
    path("register/", RegisterUser.as_view(), name='signup_api'),
    path('login_user/', LoginAPIView.as_view(), name='login_api'),
    path('searchresult/', SearchResultView.as_view(), name='searchres'),
    path('searchhistory/', SearchHistoryView.as_view(), name='search_his'),
    
    
    
    
    path('createsearchhistory/', createSerchHistory.as_view(), name='_crsearch_his'),
    
    
    
    
    
    
    path(" ", SignupView, name='signup'),
    path('home/', HomeView.as_view(), name='homepage'),
    path('api/search/<str:query>/', search, name='search'),
    # path('api/save_history/', save_search_history, name='save_search_history'),
    path('api/search_history/', search_history, name='search_history'),

    path('signup/', SignupView, name='signup'),
    # path('activate/<str:uid>/<str:token>/', activate_account, name='activate_account'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('signout/', auth_views.LogoutView.as_view(template_name='registration/signout.html'), name='signout'),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('reset-password/', auth_views.PasswordResetView.as_view(template_name='registration/password_reset_form.html'), name='reset-password'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='registration/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_confirm.html'), name='password_reset_confirm'),
    path('reset/done/', PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'), name='password_reset_complete'),
    
    path('react/',TemplateView.as_view(template_name='react.html'))
]











# <table className="table table-light" >
#                     <thead>
#                         <tr style={{padding:"17px"}}>
#                             <th scope="col">#</th>
#                             <th scope="col">Name</th>
#                             <th scope="col">Location</th>
#                             <th scope="col">Type</th>
#                             <th scope="col">Details</th>
#                             <th scope="col">Delete</th>
#                             <th scope="col">Update</th>
#                         </tr>
#                     </thead>
#                     <tbody>
#                     {items.map((item) => (
#                         <tr style={{padding:"17px"}}>
#                             <td>{item.ID}</td>
#                             <td>{item.name}</td>
#                             <td>{item.location}</td>
#                             <td>{item.type}</td>
#                             <td><button type="button" className="btn btn-primary">
#             <Link to="/detail" state={{name:item.name,location:item.location,type:item.type}} style={{color:"white",textDecoration: 'none'}}>Detail</Link>
#         </button></td>
#                             <td><button type="button" className="btn btn-danger" onClick={(event) =>this.HandleClick1(event,item.ID)}>Delete</button></td>
#                             <td>
#                                 {/* <button type="button" className="btn btn-warning"><Link to="/update" state={{id:item.ID,name:item.name,location:item.location,type:item.type}} style={{color:"white",textDecoration: 'none'}}>Update</Link>
#                                 </button> */}
#     <Link to="/update" style={{color:"white",textDecoration: 'none'}}><button type="button" className="btn btn-warning" onClick={this.update(this.ID,item.name,item.location,item.type)}>update</button></Link>

                                
#                                 </td>
#                         </tr>
#                     ))}
                        
#                                           </tbody>
#                 </table>