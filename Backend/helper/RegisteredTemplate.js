

function RegisteredTemplate(){
  return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Successful</title>

            <style>
                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: sans-serif;
                }
                .main {
                    padding: 10px;
                    display: flex;
                    background:white;
                    align-items: center;
                    justify-content: center;
                }

                .container {
                    width: 400px;
                    border-radius: 10px;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                /* Part 1 */
                .Section-A {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: space-evenly;
                    gap: 20px;
                    background-color: #8BC34A;
                    padding: 20px;
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                }
                .Section-A h1 {
                    color: #ffffff;
                    text-transform: uppercase;
                    font-size: 2rem;
                    letter-spacing: 1px; 
                }
                .Section-A .correct{
                    width: 10rem;
                    height: 10rem;
                    border-radius: 50%;
                    font-size: 4rem;
                    font-weight: 900;
                    border: 1px solid #ccc;
                    background-color: rgb(52, 246, 200);
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .Section-A h5 {
                    background: linear-gradient(to right, #ffffff, #ffffff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-align: center;
                    font-size: 1.5rem;
                    text-shadow: 1px 1px 1px rgba(160, 136, 136, 0.1); 
                    letter-spacing: 1px; 
                }
                /* Part 2 */
                .Section-B {
                    width: 100%;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                }
                .Section-B p {
                    font-size: 1rem;
                    line-height: 1.5;
                    text-align: center;
                }
                .Section-B button {
                    padding: 10px;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    font-size: 1.2rem;
                    cursor: pointer;
                    background-color: #331f7a;
                    border: 1px solid #ccc;
                    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
                    color: rgb(224, 213, 213);
                    border-radius: 50px;
                }
                .Section-B button:hover {
                    background-color: #4827bd;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
                }
                .Section-B button:active {
                    transform: scale(0.95);
                }

                .query{
                    padding: 20px;
                    font-size: 1rem;
                }
                .query p{
                    padding: 5px 0;
                }

                .query .Regards{
                    margin: 20px 0;
                    font-weight: 700;
                }

            </style>
        </head>
        <body>
            <div class="main">
                <div class="container">
                    <div class="Section-A">
                        <h1>Thank You!</h1>
                        <div class="correct">&#10003;</div>
                        <h5>Registration Successful </h5>

                    </div>
                    <div class="Section-B">
                        <p>Welcome to the Pikvardhan, you have Successfully registered on Pikvardhan</p>
                        <a href="http://localhost:5173/"><button id="myButton">Continue</button></a>
                    </div>

                    <div class="query">
                        <p>Have a Question? Please, Feel free to reach out, and we will get back to you as soon as possible.</p>
                        <p><b>Email:</b> gahinath.madake@mitaoe.ac.in</p>

                        <div class="Regards">
                            Thanks and regards,<br>
                            Team Pikavardhan
                        </div>

                    </div>
                </div>
            </div>
        </body>
        </html>`;
}

module.exports =  RegisteredTemplate;

