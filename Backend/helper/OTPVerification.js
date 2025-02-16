// Inline HTML for email body
function otpVerificationTemplate(name, otp, type){
      const titleText = type === 'verification' ? 'Email Verification' : 'Password Reset';
      const messageText = type === 'verification' 
          ? 'Welcome to SharePlate. To get started, please use the following OTP to verify your email address and complete your registration process.'
          : 'To reset your password, please use the following OTP code. If you did not request this password reset, please ignore this email.';
      
      return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${titleText} - SharePlate</title>
              <style>
                  body {
                      font-family: sans-serif;
                      margin: 0;
                      padding: 0;
                  }
                  .container{
                      background-color: #fff;
                  }
                  .flex{
                      display: flex;
                      justify-content: center;
                      align-items: center;
                  }
                  .header {
                      padding: 15px;
                      text-align: center;
                      padding: 20px 0;
                  }
                  .header img {
                      height: 30px;
                      border-radius: 50%;
                  }
                  .icon-wrapper{
                      background-color: #4CAF50;
                      padding: 10px;
                  }
                  .icon-wrapper span{
                      padding: 10px; 
                      border-radius: 50%;
                      background-color: #C8E6C9;
                  }
                  .main-content{
                      padding: 20px;
                  }
                  .main-content h1{
                      font-size: 2rem;
                      color: #2E7D32;
                  }
                  .main-content p{
                      font-size: 1rem;
                      line-height: 1.5;
                  }
                  .otp-container {
                      gap: 30px;
                      margin-top: 20px;
                      margin-bottom: 20px;
                  }
                  .otp-container span {
                      background-color: #E8F5E9;
                      padding: 10px 15px;
                      border-radius: 5px;
                      font-weight: bold;
                      color: #2E7D32;
                      border: 1px solid #4CAF50;
                  }
                  .footer {
                      margin-top: 30px;
                      padding: 20px;
                      background-color: #F5F5F5;
                      text-align: center;
                  }
                  .footer p {
                      color: #666;
                      font-size: 0.9rem;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header flex">
                      <h2 style="color: #2E7D32;">Share<span style="color: #4CAF50;">Plate</span></h2>
                  </div>
  
                  <div class="icon-wrapper flex">
                      <span class="flex">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: #2E7D32;">
                              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
                          </svg>
                      </span>
                  </div>
  
                  <div class="main-content">
                      <h1>${titleText}</h1>
                      <p>
                          Hello <b>${name}b>, <br />
                          ${messageText}
                      </p>
  
                      <div class="otp-container flex">
                          <span>${otp[0]}</span>
                          <span>${otp[1]}</span>
                          <span>${otp[2]}</span>
                          <span>${otp[3]}</span>
                          <span>${otp[4]}</span>
                          <span>${otp[5]}</span>
                      </div>
                  </div>
  
                  <div style="height: 1px; background-color: #4CAF50;"></div>
  
                  <div class="footer">
                      <p>
                          This is an automated message, please do not reply. <br/>
                          If you didn't request this email, you can safely ignore it.
                      </p>
                  </div>
              </div>
          </body>
          </html>
      `;
  }
  
  module.exports = otpVerificationTemplate;
  
  function otpVerificationTemplate(name, otp){
    
      return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Verification Mail for AgriTech</title>
                  <style>
                        body {
                              font-family: sans-serif;
                              margin: 0;
                              padding: 0;
                        }
                        .container{
                              background-color: #fff;
                        }
                        .flex{
                              display: flex;
                              justify-content: center;
                              align-items: center;
                        }

                        .header {
                              padding: 15px;
                              text-align: center;
                              padding: 20px 0;
                        }
                        .header img {
                              height: 30px;
                              border-radius: 50%;
                        }
                        .icon-wrapper{
                              background-color: #ff3b3b;
                              padding: 10px;
                        }
                        .icon-wrapper span{
                              padding: 10px; 
                              border-radius: 50%;
                              background-color: #eac3c3;
                        }
                        .main-content{
                              padding: 20px;
                        }
                        .main-content h1{
                              font-size: 2rem;
                        }
                        .main-content p{
                              font-size: 1rem;
                        }
                        .otp-container {
                              gap: 30px;
                              margin-top: 20px;
                              margin-bottom: 20px;
                        }
                        .otp-container span {
                              background-color: #d1d1d1;
                              padding: 10px;
                              border-radius: 5px;
                              font-weight: bold;
                        }

                        .icons-contact{
                              gap:10px;
                              padding: 10px;
                        }
                        .icons-contact svg{
                              width: 30px;
                              background-color: white;
                        }
                  </style>
            </head>
            <body>
                  <div class="container">
                  
                        <div class="header flex">
                              <img src="https://res.cloudinary.com/dyrbjtr8b/image/upload/v1732112658/profile_pictures/vt3gnlkijifzzw9uzesy.jpg" alt="logo" />
                        </div>

                        <div class="icon-wrapper flex">
                              <span class="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                          <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
                                    </svg>
                              </span>
                        </div>

                        <div class="main-content">
                              <h1>Email Verification</h1>
                              <p>
                                    Hello <b>${name}</b>, <br />
                                    Welcome to AgriTech. <br />
                                    To get started, please use the following OTP to verify your email address and complete your registration process.
                              </p>

                              <!-- OTP Display -->
                              <div class="otp-container flex">
                                    <span>${otp[0]}</span>
                                    <span>${otp[1]}</span>
                                    <span>${otp[2]}</span>
                                    <span>${otp[3]}</span>
                                    <span>${otp[4]}</span>
                                    <span>${otp[5]}</span>
                              </div>
                        </div>

                        <div style="height: 1px; background-color:  #ff3b3b;"></div>

                        <div class="flex icons-contact">
                              <a class="icon github" target="_blank" href="https://github.com/GahinathMadake">
                              <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>
                              </a>

                              <a target="_blank" href="https://www.linkedin.com/in/gahinath-madake-28517b2a1/">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgb(7, 135, 255);transform: ;msFilter:;"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path></svg>
                              </a>

                              <a target="_blank" href="mailto:gahinathmadake@gmail.com">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgb(109, 37, 37);transform: ;msFilter:;"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path></svg>
                              </a>

                              <a target="_blank" href="tail:+918767738537">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: rgb(89, 255, 0);transform: ;msFilter:;"><path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"></path><path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"></path></svg>
                              </a>  
                        </div>

                        <p>
                              Thanks and Regards,<br/>
                              Gahinath Madake
                        </p>
                  </div>

            </body>
            </html>

      `;
}

module.exports = otpVerificationTemplate;            