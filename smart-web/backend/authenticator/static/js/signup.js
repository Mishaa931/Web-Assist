// signup.js

document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById('auth-form-table');
    const passwordInput = document.getElementById("id_password");
    const passwordMessage = document.getElementById("password-message");
    const passwordMessageItems = passwordMessage.querySelectorAll(".password-message-item");
    const rocketImage = document.getElementById('rocket');
  
    function updateValidity(index, isValid) {
      if (isValid) {
        passwordMessageItems[index].classList.remove("invalid");
        passwordMessageItems[index].classList.add("valid");
      } else {
        passwordMessageItems[index].classList.remove("valid");
        passwordMessageItems[index].classList.add("invalid");
      }
    }
  
    function animateHeight(element, newHeight) {
      const startingHeight = element.offsetHeight;
      const heightDiff = newHeight - startingHeight;
      let steps = 10;
      let progress = 0;
  
      const animationStep = () => {
        const updatedHeight = startingHeight + (progress / steps) * heightDiff;
        element.style.height = `${updatedHeight}px`;
        progress++;
        if (progress <= steps) {
          requestAnimationFrame(animationStep);
        }
      };
      animationStep();
    }
  
    function animateWidth(element, newWidth) {
      const startingWidth = element.offsetWidth;
      const widthDiff = newWidth - startingWidth;
      let steps = 10;
      let progress = 0;
    
      const animationStep = () => {
        const updatedWidth = startingWidth + (progress / steps) * widthDiff;
        element.style.width = `${updatedWidth}px`;
        progress++;
        if (progress <= steps) {
          requestAnimationFrame(animationStep);
        }
      };
      animationStep();
    } 
  
    function adjustTableHeight() {
      if (getComputedStyle(passwordMessage).display !== 'none') {
        const messageHeight = passwordMessage.offsetHeight;
        const currentTableHeight = table.offsetHeight;
        const newTableHeight = currentTableHeight + messageHeight;
      
        // Animate height of both table and image
        animateHeight(rocketImage, newTableHeight);
        animateHeight(table, newTableHeight);
      } 
      else {
        // Reset height without animation
        table.style.height = '';
        rocketImage.style.height = '';
      }
    }
  
    function adjustTableWidth() {
      if (getComputedStyle(passwordMessage).display !== 'none') {
        const currentWidth = table.offsetWidth;
        const newTableWidth = currentWidth + (currentWidth * 20) / 100;
            
        // Animate height of both table and image
        animateWidth(table, newTableWidth);
      } 
      else {
        // Reset width without animation
        table.style.width = '';
      }
    }
  
    passwordInput.addEventListener("input", function () {
      const password = passwordInput.value;
      updateValidity(0, password.length >= 8);      // Rule 1: At least 8 characters
      updateValidity(1, /[a-z]/.test(password));    // Rule 2: At least one lowercase letter
      updateValidity(2, /[A-Z]/.test(password));    // Rule 3: At least one uppercase letter
      updateValidity(3, /\d/.test(password));       // Rule 4: At least one numeric digit
      updateValidity(4, /[^\w\d]/.test(password));  // Rule 5: At least one special character
    });
  
    passwordInput.addEventListener("focus", function () {
      passwordMessage.style.display = "block";
      adjustTableHeight();
      adjustTableWidth();
    });
  
    passwordInput.addEventListener("blur", function () {
      setTimeout(function () {
        passwordMessage.style.display = "none";
        adjustTableHeight();
        adjustTableWidth();
      }, 200);
    });
  });