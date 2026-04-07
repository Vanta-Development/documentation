# Setting up your discord panel

## Overview

Vanta Panel is a web-based Discord server management dashboard. It consists of two parts that work together — a **frontend interface** for interacting with your servers, and a **backend server** that powers the bot and API. This guide walks you through setting both up.

## Requirements

### Account Requirements
- A Discord account with admin or owner access to the server you want to manage.
- A Supabase account for the database backend.

### Server Requirements
- Node.js version 18 or higher.
- A publicly accessible server or local machine to host the panel backend.

### Browser Requirements
- A modern web browser (Chrome, Firefox, Edge, Safari).
- Cookies and JavaScript enabled.

## Choosing a Plan

Before setting up, choose a subscription plan that fits your needs. Plans can be selected from the **Subscribe** page.

| Plan | Price | Hosting | Servers | Key Features |
|---|---|---|---|---|
| Free | £0/month | Self-hosted | 1 | Dashboard access, 3-day audit logs |
| Basic Panel | £5/month | Self-hosted | 1 | Full dashboard, complete audit logs, advanced analytics |
| Panel + Hosting | £15/month | Vanta-hosted | 1 | Everything in Basic plus 24/7 bot hosting, auto-updates |
| Premium | £25/month | Vanta-hosted | Unlimited | Everything in Professional plus multi-server, custom branding, API access |

On the **Free** and **Basic** tiers you host the Discord bot yourself. On **Panel + Hosting** and **Premium**, Vanta hosts and manages the bot for you.

> ⚠️ You must have an active subscription to access the panel, including the Free tier. Without a subscription selected, all servers will be locked and inaccessible. You can subscribe from the **Subscribe** page after logging in.



## Bot Hosting

How your bot is hosted depends on your plan. Note that the bot setup process described below is only required for **Tier 1 (Basic Panel)** and **Tier 2 (Panel + Hosting)**. Free tier users do not go through this flow, and Premium users have their bot fully managed by Vanta from the start.

**Tier 1 — Basic Panel (self-hosted)** — you run the Discord bot on your own machine or VPS. Download the bot files from the Settings page, paste your token into the config, and run it yourself. Vanta does not host or access self-hosted bots.

**Tier 2 — Panel + Hosting (Vanta-hosted)** — navigate to **Settings → Bot Hosting** and enter your bot token, bot name, and optionally a bot avatar URL, then click **Connect & Deploy Bot**. Vanta will handle hosting, uptime, and updates automatically.

**Premium** — bot hosting is fully managed by Vanta with dedicated resources. No manual setup is required.

## Discord Application Setup

Regardless of your plan, you need to create a Discord application and bot first.

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications) and click **New Application**. Give it a name and save.

2. Navigate to the **Bot** tab and click **Add Bot**. Under **Privileged Gateway Intents**, enable all three intents:
   - Server Members Intent
   - Message Content Intent
   - Presence Intent

3. On the Bot tab, click **Reset Token** and copy your bot token — you will need this later. Never share this token with anyone.

4. Navigate to **OAuth2 → URL Generator**. Under **Scopes** select `bot` and `applications.commands`. Under **Bot Permissions** select `Administrator`. Copy the generated URL and use it to invite the bot to your server.

5. From **OAuth2 → General**, copy your **Client ID** and **Client Secret** for use in the backend configuration.

## Backend Setup

The backend handles authentication, the Discord bot, API routes, and the database.

### 1. Install Dependencies

Clone or download the Vanta Panel backend, then run:
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project and fill in the following:
```env
# Discord OAuth
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback

# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Session
SESSION_SECRET=any_long_random_string

# Bot
BOT_TOKEN=your_bot_token
CLIENT_ID=your_discord_application_client_id
GUILD_ID=your_discord_server_id

# Optional: staff notification channel
STAFF_CHANNEL_ID=your_staff_channel_id

# Dashboard admin login
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=yourpassword

PORT=3000
```

### 3. Set Up Supabase

Create a new project at [supabase.com](https://supabase.com). From **Settings → API**, copy your Project URL and anon key into your `.env` file.

Then run the following SQL in the Supabase SQL editor to create the required tables:
```sql
create table guild_configs (
  guild_id text primary key,
  guild_name text,
  bot_token text,
  setup_complete boolean default false
);

create table tickets (
  id text primary key,
  tag text,
  open boolean default true,
  unread boolean default true,
  updated_at timestamptz,
  guild_id text
);

create table ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id text,
  from_role text,
  content text,
  created_at timestamptz default now()
);

create table ticket_settings (
  id uuid primary key default gen_random_uuid(),
  auto_close boolean default false,
  send_transcript boolean default false,
  require_close_reason boolean default false,
  notify_on_open boolean default false,
  user_can_close boolean default false
);

create table punishments (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  username text,
  type text,
  reason text,
  moderator_id text,
  moderator_tag text,
  duration_minutes int,
  guild_id text,
  created_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  action text,
  target_id text,
  target_tag text,
  detail text,
  channel text,
  reason text,
  guild_id text,
  created_at timestamptz default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id text,
  reporter_tag text,
  target_id text,
  target_tag text,
  reason text,
  status text default 'open',
  resolved_by text,
  guild_id text,
  created_at timestamptz default now()
);

create table suggestions (
  id uuid primary key default gen_random_uuid(),
  author_tag text,
  content text,
  status text default 'pending',
  guild_id text,
  created_at timestamptz default now()
);

create table giveaways (
  id uuid primary key default gen_random_uuid(),
  channel_id text,
  channel_name text,
  message_id text,
  prize text,
  description text,
  winners int default 1,
  ends_at timestamptz,
  status text default 'active',
  created_by text,
  created_at timestamptz default now()
);

create table reaction_roles (
  id uuid primary key default gen_random_uuid(),
  channel_id text,
  message_id text,
  emoji text,
  role_id text,
  role_name text,
  created_at timestamptz default now()
);

create table automod_settings (
  id uuid primary key default gen_random_uuid(),
  anti_spam boolean default false,
  anti_links boolean default false,
  anti_invites boolean default false,
  anti_caps boolean default false,
  anti_slurs boolean default false,
  anti_mentions boolean default false,
  action text default 'delete',
  timeout_mins text,
  spam_threshold text,
  max_mentions text,
  whitelist_roles text
);

create table welcome_settings (
  id uuid primary key default gen_random_uuid(),
  welcome_enabled boolean default false,
  leave_enabled boolean default false,
  welcome_channel text,
  leave_channel text,
  welcome_message text,
  leave_message text,
  welcome_color text,
  auto_role text
);

create table dashboard_users (
  id uuid primary key default gen_random_uuid(),
  username text unique,
  password text,
  role text default 'staff',
  permissions text[] default '{}'
);

create table announcements (
  id uuid primary key default gen_random_uuid(),
  channel_id text,
  channel_name text,
  title text,
  content text,
  posted_by text,
  created_at timestamptz default now()
);
```

### 4. Start the Server
```bash
node index.js
```

The panel will be available at `http://localhost:3000`.

## Logging In

The panel supports two login methods.

**Discord OAuth** — click **Continue with Discord** on the login page and authorize the application. You will be shown a list of all servers where you have admin or owner permissions.

**Username and password** — for staff accounts that don't log in via Discord, navigate to `/login.html` and enter the credentials created by an admin.

## Server Selection and Bot Setup

After logging in with Discord you will see your server list. Servers are unlocked based on your plan — Free and Basic plans allow one server, while Premium unlocks unlimited servers.

Click a server to select it. If it hasn't been set up yet, you will be taken through the **Bot Setup** flow with four steps:

1. Create a Discord application if you haven't already.
2. Enable the required Privileged Gateway Intents on the Bot tab.
3. Invite the bot to your server using the OAuth2 URL Generator.
4. Paste your bot token into the input and click **Connect**.

The panel validates the token and confirms the bot is present in the server. Once connected you are redirected to the main dashboard.

## Bot Hosting

How your bot is hosted depends on your plan.

**Free and Basic (self-hosted)** — you run the Discord bot on your own machine or VPS. Download the bot files from the Settings page, paste your token into the config, and run it yourself. Vanta does not host or access self-hosted bots.

**Panel + Hosting and Premium (Vanta-hosted)** — navigate to **Settings → Bot Hosting** and enter your bot token, bot name, and optionally a bot avatar URL, then click **Connect & Deploy Bot**. Vanta will handle hosting, uptime, and updates automatically.

## Adding Staff Accounts

To give team members dashboard access without Discord OAuth:

1. Log in as admin and navigate to **Settings → Dashboard Users**.
2. Click **Add User** and fill in a username, password, and role.
3. Assign a role — **Admin** gives full access including user management, **Moderator** covers tickets, punishments, logs, and user management, and **Staff** allows you to pick individual permissions from a checklist.

Staff members can then log in at `/login.html` with their credentials.

## What's Next

Once logged in and set up, your dashboard gives you access to:

- **Users** — view all members, apply bans, timeouts, warnings, and manage roles.
- **Ticket Panel** — manage support tickets sent via Discord DMs.
- **Audit Logs** — a live feed of server events including joins, leaves, bans, and message deletions.
- **Punishments** — a full moderation history with filtering by type.
- **Announcements** — post rich embeds to any channel directly from the dashboard.
- **AutoMod** — configure spam, link, invite, caps, and mention filters with automated actions.
- **Giveaways** — create and end giveaways with automatic winner selection.
- **Reaction Roles** — assign roles to users who react to a specific message.
- **Welcome & Leave** — configure join and leave messages with auto-role assignment.
- **Analytics** — server stats, punishment breakdowns, and activity charts.