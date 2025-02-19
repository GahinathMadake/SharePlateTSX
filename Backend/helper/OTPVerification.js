
function otpVerificationTemplate(name, otp, type){
      const titleText = (type === 'verification' ? 'Email Verification' : 'Password Reset');
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
                          Hello <b>${name}<br/>
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
