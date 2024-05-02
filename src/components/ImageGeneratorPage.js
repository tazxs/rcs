import React, { useState } from "react";

function ImageGeneratorPage() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") {
      setError("400 Bad Request – Your input was malformed.");
      return;
    }
    if (inputText === "invalid_token") {
      setError("401 Unauthorized – Your API token is invalid. Please enter a new API token.");
      return;
    }
    if (inputText === "quota_exceeded") {
      setError("403 Forbidden – Your billing quota has been exceeded. Wait until next month or increase your quota.");
      return;
    }
    setError('');
    const newMessages = [...messages, { type: 'text', content: inputText }];
    setMessages(newMessages);
    generateImageResponse(inputText);
    setInputText("");
  };
  const handleZoomIn = (index) => {
    const newMessages = messages.map((msg, idx) =>
      idx === index && msg.type === 'image' ? { ...msg, zoom: msg.zoom + 10 } : msg
    );
    setMessages(newMessages);
  };

  const handleZoomOut = (index) => {
    const newMessages = messages.map((msg, idx) =>
      idx === index && msg.type === 'image' ? { ...msg, zoom: Math.max(msg.zoom - 10, 10) } : msg
    );
    setMessages(newMessages);
  };

  const handleSaveImage = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "downloaded-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const generateImageResponse = (text) => {
    setLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const nextProgress = prevProgress + 20;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          setProgress(0);
          const imageResponse = {
            type: 'image',
            content: "logo192.png",
            zoom: 50  // Начальный масштаб уменьшен до 50%
          };
          // Убедимся, что setMessages вызывается только один раз
          setMessages(prevMessages => [...prevMessages, imageResponse]);
          return nextProgress;
        }
        return nextProgress;
      });
    }, 500);
  };
  

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleSendMessage} disabled={loading}>Send Message</button>
      {loading && <div className="progress-bar" style={{ width: `${progress}%` }}></div>}
      <div>
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.type === 'text' ? (
              <p>{message.content}</p>
            ) : (
              <div>
                <img src={message.content} alt="Generated" style={{ width: `${message.zoom}%` }} />
                <button onClick={() => handleZoomIn(index)}>Zoom In</button>
                <button onClick={() => handleZoomOut(index)}>Zoom Out</button>
                <button onClick={() => handleSaveImage(message.content)}>Download</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  ;
}

export default ImageGeneratorPage;
