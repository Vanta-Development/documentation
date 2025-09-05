# Vanta FiveM - Setup 

## Requirements

### Server Requirements
* A FiveM server running the latest [FXServer](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/).
* RCON enabled for remote commands (you’ll need the password).
* Internet access for the server to communicate with Vanta.
* A database server like xampp or mariaDB which is what i recommend.

### Account Requirements
* A Vanta account (sign up on the Vanta portal).
* A Discord account with admin access to your server if you want Discord integration.

### Browser Requirements
* Modern web browser (Chrome, Firefox, Edge, Safari).
* Cookies enabled for session persistence.

### Optional Requirements
* For script management: scripts should be compatible with FiveM resource structure.
* For Discord notifications: the Discord bot must be invited with proper permissions to the server.

## Server Configuration

To set up your FiveM server for use with the Vanta management panel, follow these steps:

1. **Install MariaDB**  
   Download and install [MariaDB](https://mariadb.org/download/) for your operating system.  
   This will be used as the database backend for your server.

2. **Download FiveM Artifacts**  
   Go to the [FiveM Artifacts](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/) page and download the latest version for Windows.

3. **Create Your Server Folder**  
   - On your desktop, create a new folder.  
   - You can name it anything you want (we recommend using your server’s name).

4. **Set Up fxServer**  
   - Inside your new folder, create another folder called `fxServer`.  
   - Extract the downloaded FiveM artifacts into this `fxServer` folder.  
   - Your folder structure should look like this:  

     ```
     MyServer/
     └── fxServer/
         ├── .gitignore
         ├── ...
         ├── fxserver.exe
     ```

5. **Start the Server Setup**  
   - Open `fxserver.exe`.  
   - This will open a browser window at [http://localhost:4020](http://localhost:4020).  
   - Follow the on-screen setup instructions to configure your server.  

💡 *Optional:* If you’d like a walkthrough, check out [this video tutorial](https://youtu.be/JzQvffMFWGM?si=QpHWYrxN0ci8PSq6). This is for

---

✅ If you completed everything correctly, your FiveM server is now running!  
In the next section, we’ll guide you through setting up the **Vanta management panel** to connect with your server.


## Vanta Panel Setup (Local Hosting)
Now that your FiveM server is online, let’s connect it to the Vanta management panel.

### 1. Download the Panel
- Go to our [GitHub repository](https://github.com/vantadevelopment) and download the latest **Vanta Panel** release.
- Extract it to a folder on your machine (e.g., `C:\VantaPanel`).

### 2. Install Dependencies
- Make sure you have [**Node.js**](https://nodejs.org/en/download/) installed (version 18+ recommended).  
- Open a terminal in the panel folder and run:
``npm install``


This will install all required dependencies.

### 3. Configure the Panel and Generate the API Key

1. **Start the Panel for the First Time**  
   - Open a terminal or command prompt in your panel folder.  
   - Run: ``npm start``

   - This will launch the panel locally, usually at [http://localhost:53134](http://localhost:53134).

2. **Access the Panel in Your Browser**  
- Open your browser and navigate to the URL shown in the terminal (default: http://localhost:53134).  
- On the panel homepage, you will see a prompt to **generate a new API key**.  
- Click the button to generate the key. The panel will display the key on-screen. 

3. **Paste the Key into the Panels .env File** 

Inside the panel folder, open .env.

paste the key you generated into 
```env
VANTA_API_KEY=PASTE_YOUR_GENERATED_KEY_HERE
```

## Vanta API Configuration

After configuring the Vanta pannel on your server, you can set up the Vanta api script to manage your server.

### 1. Create a Vanta Folder
Navigate to your servers base folder inside the txdata folder. It should be something like Qb_A627B9.base, you'll know if its right when you see the [resources] folder. 

In the base folder, make a new folder and call it [vanta] this is where all yor vanta scripts will go. 

Next, go to our [Github](https://github.com/vantadevelopment) and download vanta_api. Put that into your [vanta] folder.

Then, go to your server.cfg and under the Extra stuff section where you see stuff like ensure [standalone] ensure [voice] ensure[assets], type ``ensure [versa]`` at the end of the list.

### 2. Configure the API

Inside the `[vanta]/vanta_api` folder, open the `config.lua` file.  

1. Replace the placeholder with your **Vanta API key** from the dashboard:

```lua
Config.ApiKey = "YOUR_API_KEY_HERE"
```
Make sure is the same key as it is in your panels .env file to ensure the pannel connects properly with your DB

2. (Optional) Restrict access to specific IP addresses for added security:

```lua
Config.AllowedIPs = {
    "127.0.0.1",   -- Localhost
    "123.45.67.89" -- Example external IP
}
```

