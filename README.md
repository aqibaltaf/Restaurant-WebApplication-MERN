# User Guide - How To Use
![Desi FOOD](https://user-images.githubusercontent.com/61707240/172073197-d875610b-332c-47ff-a829-a772d3bb17f3.png)
# Backend
## Modules Requirement?
<pre>
Open Terminal (cmd)
cd YourProjectFolderName
Enter: npm install</pre>

## Database Requirement?

<pre>Now, Search Mongo Atlas on Google and create an account.
Once you are logged in there follow these steps:
1. Go to Database access and set up your Database username and password.
2. Go to Network access and type 0.0.0.0/0 or Allow access from anywhere and click confirm.
3. Go to Database under Depolyment tab, Click connect --> Connect your application ---> copy the Address.</pre>

![1](https://user-images.githubusercontent.com/61707240/155889620-d1c28fcc-ac04-4960-a2ac-8cafd269aa41.JPG)

<pre>
  4. Go to app.js in your Backend folder, and paste this link in mongoose.connect('');</pre>
  
![image](https://user-images.githubusercontent.com/61707240/155889733-ea7ea083-7cfa-47f9-b283-735ec29975e0.png)

*make sure to replace the '<password<password>>' with your Database password.
## Other Requirments
<pre> 
1. Create a .env file inside backend folder, and write your Secret Key as SECRET_KEY = write any thing you want
for eg:
      1. Create .env file
      2. Type SECRET_KEY = This is a dummy text
      3. Save .env

2. Type node server.js on your terminal to run backend.</pre>
  
# Frontend
## How To start?
  <pre>
Open Terminal (cmd)
cd YourProjectFolderName
1. Enter: npm install
2. Enter: npm start</pre>

## Contact
<pre>
For Any Query or help feel free to contact me at <Strong>aqibaltaf99@gmail.com</Strong>
And if you liked this project, Make sure to give it a star</pre>
