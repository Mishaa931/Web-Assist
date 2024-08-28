import './css/signup.css';
import logo from '../img/launch.svg';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SignUpPage = ({ handleSearch }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (value) => {
    setPassword(value);
    console.log('Password changed:', value);


    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setIsPasswordValid(passwordRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch request for authentication
    if (isPasswordValid) {
      fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            throw new Error('Authentication failed');
          }
        })
        .then((body) => {
          Swal.fire({
            title: 'Signup',
            type: 'success',
            text: 'Successfully Account created',
            icon: 'success',
          });
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Authentication failed!',
          });
        });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'validation error!',
      });

    };
  }

  return (
    <html lang="en">
      <head>
        {/* ... (head and meta tags) */}
      </head>

      <body>
        <div className="Auth-form-container">
          <div className="message">
            {/* Include your messages component here */}
          </div>
          <table id="auth-form-table">
            <tbody>
              <tr>
                <th id="col1">
                  <img src={logo} id="rocket" alt="WebAssist" />
                </th>
                <th id="col2">
                  <form onSubmit={handleSubmit} method="POST" action="/signup" className="Auth-form" id="signupForm" autoComplete="off">
                    <div className="Auth-form-content">
                      <div className="Auth-form-title">
                        <h1>Create your Account</h1>
                        <div className="text-center">
                          <h2>
                            Already registered?
                            <span className="link-primary">
                              <a href="/login">Sign In</a>
                            </span>
                          </h2>
                        </div>
                      </div>
                      <div className="input-group form-group mt-3">
                        <legend>First Name</legend>
                        <input
                          type="text"
                          name="first_name"
                          maxLength="30"
                          id="id_first_name"
                          placeholder="First Name"
                          required
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>
                      <div className="input-group form-group mt-3">
                        <legend>Last Name</legend>
                        <input
                          type="text"
                          name="last_name"
                          maxLength="30"
                          id="id_last_name"
                          placeholder="Last Name"
                          required
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                      <div className="input-group form-group mt-3">
                        <legend>Email Address</legend>
                        <input
                          type="email"
                          name="email"
                          maxLength="100"
                          id="id_email"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group form-group mt-3">
                        <legend>Password</legend>
                        <input
                          type="password"
                          name="password"
                          id="id_password"
                          placeholder="Password"
                          autoComplete="new-password"
                          required
                          value={password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                      </div>
                      <div id="password-message">
                        <h3>Password must contain:</h3>
                        
                        <ul>
                          <li>{isPasswordValid ? '✅ At least 8 characters' : '❌ At least 8 characters'}</li>
                          <li>{isPasswordValid ? '✅ At least one lowercase letter' : '❌ At least one lowercase letter'}</li>
                          <li>{isPasswordValid ? '✅ At least one uppercase letter' : '❌ At least one uppercase letter'}</li>
                          <li>{isPasswordValid ? '✅ At least one numeric digit' : '❌ At least one numeric digit'}</li>
                          <li>{isPasswordValid ? '✅ At least one special character' : '❌ At least one special character'}</li>
                        </ul>
                      </div>
                      <button type="submit" className="submit form-group" disabled={!isPasswordValid}>
                        Sign Up
                      </button>
                    </div>
                  </form>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
};

export default SignUpPage;



// // / frontend/src/Components/Signup.js
// import React, { useState,useEffect } from 'react';
// import Swal from 'sweetalert2';
// import logo from '../img/launch.svg';
// import './css/signup.css';

// const SignUpPage = ({ handleSearch }) => {
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [isPasswordValid, setIsPasswordValid] = useState(false);
//   const [messages, setMessages] = useState([]);

  
//   useEffect(() => {
//     // Add your functions from Django signup.js related to password validation, animation, and adjusting table dimensions here
//     const table = document.getElementById('auth-form-table');
//     const passwordInput = document.getElementById("id_password");
//     const passwordMessage = document.getElementById("password-message");
//     const passwordMessageItems = passwordMessage ? passwordMessage.querySelectorAll(".password-message-item") : null;
//     const rocketImage = document.getElementById('rocket');

//     function updateValidity(index, isValid) {
//       if (isValid) {
//         passwordMessageItems[index].classList.remove("invalid");
//         passwordMessageItems[index].classList.add("valid");
//       } else {
//         passwordMessageItems[index].classList.remove("valid");
//         passwordMessageItems[index].classList.add("invalid");
//       }
//     }

//     function animateHeight(element, newHeight) {
//       const startingHeight = element.offsetHeight;
//       const heightDiff = newHeight - startingHeight;
//       let steps = 10;
//       let progress = 0;
  
//       const animationStep = () => {
//         const updatedHeight = startingHeight + (progress / steps) * heightDiff;
//         element.style.height = `${updatedHeight}px`;
//         progress++;
//         if (progress <= steps) {
//           requestAnimationFrame(animationStep);
//         }
//       };
//       animationStep();
//     }

//     function animateWidth(element, newWidth) {
//       const startingWidth = element.offsetWidth;
//       const widthDiff = newWidth - startingWidth;
//       let steps = 10;
//       let progress = 0;
    
//       const animationStep = () => {
//         const updatedWidth = startingWidth + (progress / steps) * widthDiff;
//         element.style.width = `${updatedWidth}px`;
//         progress++;
//         if (progress <= steps) {
//           requestAnimationFrame(animationStep);
//         }
//       };
//       animationStep();
//     }

//     function adjustTableHeight() {
//       if (getComputedStyle(passwordMessage).display !== 'none') {
//         const messageHeight = passwordMessage.offsetHeight;
//         const currentTableHeight = table.offsetHeight;
//         const newTableHeight = currentTableHeight + messageHeight;
      
//         // Animate height of both table and image
//         animateHeight(rocketImage, newTableHeight);
//         animateHeight(table, newTableHeight);
//       } 
//       else {
//         // Reset height without animation
//         table.style.height = '';
//         rocketImage.style.height = '';
//       }
//     }

//     function adjustTableWidth() {
//       if (getComputedStyle(passwordMessage).display !== 'none') {
//         const currentWidth = table.offsetWidth;
//         const newTableWidth = currentWidth + (currentWidth * 20) / 100;
            
//         // Animate height of both table and image
//         animateWidth(table, newTableWidth);
//       } 
//       else {
//         // Reset width without animation
//         table.style.width = '';
//       }
//     }

//     passwordInput.addEventListener("input", function () {
//       const password = passwordInput.value;
//       updateValidity(0, password.length >= 8);      // Rule 1: At least 8 characters
//       updateValidity(1, /[a-z]/.test(password));    // Rule 2: At least one lowercase letter
//       updateValidity(2, /[A-Z]/.test(password));    // Rule 3: At least one uppercase letter
//       updateValidity(3, /\d/.test(password));       // Rule 4: At least one numeric digit
//       updateValidity(4, /[^\w\d]/.test(password));  // Rule 5: At least one special character
//     });
  
//     passwordInput.addEventListener("focus", function () {
//       passwordMessage.style.display = "block";
//       adjustTableHeight();
//       adjustTableWidth();
//     });

//     passwordInput.addEventListener("blur", function () {
//       setTimeout(function () {
//         passwordMessage.style.display = "none";
//         adjustTableHeight();
//         adjustTableWidth();
//       }, 200);
//     });

//     const closeMessage = (event) => {
//       const alertElement = event.target.closest('.alert');
//       if (alertElement && alertElement.innerText.trim() !== '') {
//         alertElement.style.display = 'none';
//       }
//     };
  
//     // Attach click event to close buttons only if there are messages
//     const closeButtons = document.querySelectorAll('.close');
//     if (closeButtons.length > 0) {
//       closeButtons.forEach((closeBtn) => {
//         closeBtn.addEventListener('click', closeMessage);
//       });
//     }
//   }, []);
  
//   const handlePasswordChange = (value) => {
//     setPassword(value);
//     console.log('Password changed:', value);

//     // Password strength validation
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     setIsPasswordValid(passwordRegex.test(value));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Fetch request for authentication
//     if (isPasswordValid) {
//       fetch('http://localhost:8000/register/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           first_name: firstname,
//           last_name: lastname,
//           email: email,
//           password: password,
//         }),
//       })
//         .then((response) => {
//           if (response.status === 201) {
//             return response.json();
//           } else {
//             throw new Error('Authentication failed');
//           }
//         })
//         .then((body) => {
//           Swal.fire({
//             title: 'Signup',
//             type: 'success',
//             text: 'Successfully Account created',
//             icon: 'success',
//           });
//           window.location.reload();
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Authentication failed!',
//           });
//         });
//     }else{
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'validation error!',
//       });

//     };
//   };

//   return (
//     <div className="Auth-form-container">
//       {messages.length > 0 && (
//       <div className="message">
//         {/* <div className="alert success">
//           <h3>Your account has been created successfully.</h3>
//           <a className="close">
//             <p className="cross">&times;</p>
//           </a>
//         </div>
//         <div className="alert danger">
//           <h3>Error message here</h3>
//           <a className="close">
//             <p className="cross">&times;</p>
//           </a>
//         </div> */}
//       </div>
//       )}
//       <table id="auth-form-table">
//         <tbody>
//           <tr>
//             <th id="col1">
//               <img src={logo} id="rocket" alt="WebAssist" />
//             </th>
//             <th id="col2">
//               <form onSubmit={handleSubmit} method="POST" action="/signup" className="Auth-form" id="signupForm" autoComplete="off">
//                 <div className="Auth-form-content">
//                   <div className="Auth-form-title">
//                     <h1>Create your Account</h1>
//                     <div className="text-center">
//                       <h2>
//                         Already registered?
//                         <span className="link-primary">
//                           <a href="/login">Sign In</a>
//                         </span>
//                       </h2>
//                     </div>
//                   </div>
//                   <div className="input-group form-group mt-3">
//                     <legend>First Name</legend>
//                     <input
//                       type="text"
//                       name="first_name"
//                       maxLength="30"
//                       id="id_first_name"
//                       placeholder="First Name"
//                       required
//                       value={firstname}
//                       onChange={(e) => setFirstname(e.target.value)}
//                     />
//                   </div>
//                   <div className="input-group form-group mt-3">
//                     <legend>Last Name</legend>
//                     <input
//                       type="text"
//                       name="last_name"
//                       maxLength="30"
//                       id="id_last_name"
//                       placeholder="Last Name"
//                       required
//                       value={lastname}
//                       onChange={(e) => setLastname(e.target.value)}
//                     />
//                   </div>
//                   <div className="input-group form-group mt-3">
//                     <legend>Email Address</legend>
//                     <input
//                       type="email"
//                       name="email"
//                       maxLength="100"
//                       id="id_email"
//                       placeholder="Email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>
//                   <div className="input-group form-group mt-3">
//                     <legend>Password</legend>
//                     <input
//                       type="password"
//                       name="password"
//                       id="id_password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                       required
//                       value={password}
//                       onChange={(e) => handlePasswordChange(e.target.value)}
//                     />
//                   </div>
//                   <div id="password-message">
//                     <h3>Password must contain:</h3>

//                     <ul>
//                       <li>{isPasswordValid ? '✅ At least 8 characters' : '❌ At least 8 characters'}</li>
//                       <li>{isPasswordValid ? '✅ At least one lowercase letter' : '❌ At least one lowercase letter'}</li>
//                       <li>{isPasswordValid ? '✅ At least one uppercase letter' : '❌ At least one uppercase letter'}</li>
//                       <li>{isPasswordValid ? '✅ At least one numeric digit' : '❌ At least one numeric digit'}</li>
//                       <li>{isPasswordValid ? '✅ At least one special character' : '❌ At least one special character'}</li>
//                     </ul>
//                   </div>
//                   <button type="submit" className="submit form-group" disabled={!isPasswordValid}>
//                     Sign Up
//                   </button>
//                 </div>
//               </form>
//             </th>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SignUpPage;