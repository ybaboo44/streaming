// src/StreamingPage.js
import React, { useState } from "react";
import axios from "axios";
import { Card, Button, Input } from "react-bootstrap";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const StreamingPage = () => {
  const [accessToken, setAccessToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        accessToken,
      });

      if (response.data.success) {
        // Récupérer l'URL du flux vidéo après l'authentification
        const videoResponse = await axios.get("http://localhost:5000/api/video-url");
        setVideoUrl(videoResponse.data.videoUrl);
        setIsAuthenticated(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <Card className="p-4 w-50 bg-secondary rounded shadow-lg">
        {!isAuthenticated ? (
          <div className="d-flex flex-column gap-3">
            <h2 className="text-center">Accès Privé</h2>
            <Input
              type="password"
              placeholder="Entrer votre clé d'accès"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="p-2 rounded bg-dark text-white"
            />
            <Button variant="primary" onClick={handleLogin}>
              Accéder
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-center mb-4">Bienvenu dans la zone privée</h2>
            <Player playsInline src={videoUrl} autoPlay fluid />
          </div>
        )}
      </Card>
    </div>
  );
};

export default StreamingPage;
