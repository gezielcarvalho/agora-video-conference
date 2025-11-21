# Agora Video Conference

A real-time video conferencing application built with React, Vite, and Agora RTC SDK. This application enables multi-user video calls with audio controls and a clean, modern interface.

## Features

- **Real-time Video Conferencing**: Connect with multiple users in a single video room
- **Audio Controls**: Mute/unmute microphone with visual feedback
- **User Management**: Automatic handling of users joining and leaving the room
- **Responsive UI**: Built with Material-UI components for a polished look
- **Fast Development**: Powered by Vite for instant hot module replacement (HMR)

## Technologies Used

- **React 18.3.1**: Modern UI library with hooks
- **Vite 5.4.8**: Next-generation frontend build tool
- **Agora RTC SDK NG 4.22.1**: Real-time communication platform
- **Material-UI 6.1.2**: React component library
- **Emotion**: CSS-in-JS styling solution

## Project Structure

```
agora-video-conference/
├── src/
│   ├── components/
│   │   ├── Header/          # Application header with branding
│   │   ├── VideoPlayer/     # Individual video player component
│   │   └── VideoRoom/       # Main video conferencing room
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── assets/              # Static assets
├── public/                  # Public static files
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Agora account and App ID ([Get one here](https://www.agora.io/))

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd agora-video-conference
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Agora credentials:
   - Open `src/components/VideoRoom/VideoRoom.jsx`
   - Update the following constants with your Agora credentials:
     ```javascript
     const APP_ID = "your-app-id";
     const TOKEN = "your-token";
     const CHANNEL = "your-channel-name";
     ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

1. **Join a Room**: Click the "JOIN ROOM" button on the home screen
2. **Video Conference**: Your video will appear along with other participants
3. **Mute/Unmute**: Click the microphone icon to toggle audio
4. **Leave Room**: Click "LEAVE ROOM" to exit the conference

## Components Overview

### App.jsx

Main application component that manages the join state and renders either the join button or the video room.

### Header

Displays the application branding with Material-UI icons and typography.

### VideoRoom

Core component handling:

- Agora client initialization
- User subscription and publishing
- Audio/video track management
- Microphone mute/unmute functionality
- Room leave functionality

### VideoPlayer

Renders individual user video streams with their UID.

## Development

Run ESLint for code quality:

```bash
npm run lint
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is private and for educational/development purposes.

## Acknowledgments

- [Agora.io](https://www.agora.io/) for the RTC SDK
- [Material-UI](https://mui.com/) for the component library
- [Vite](https://vitejs.dev/) for the build tool
