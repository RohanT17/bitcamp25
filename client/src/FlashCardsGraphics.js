// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function BasicExample() {
//   return (
//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>Flashcard 1</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// }

// export default BasicExample;

// App.js - Main application component
import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Form } from 'react-bootstrap';
import FlashcardDeck from './components/FlashcardDeck';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('studyPilot');
  const [transcript, setTranscript] = useState('');
  const [flashcardsGenerated, setFlashcardsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Hello from the backend!');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTranscript(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const generateFlashcards = async () => {
    if (!transcript) {
      setMessage('Please upload a transcript file first!');
      return;
    }

    setIsLoading(true);
    setMessage('Processing transcript and generating flashcards...');

    // Simulate API call to backend where your Python keyword extraction runs
    // In a real implementation, you would send the transcript to your backend
    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would be the response from your backend API
      // const response = await fetch('/api/extract-keywords', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({ transcript })
      // });
      // const data = await response.json();
      
      setFlashcardsGenerated(true);
      setMessage('Flashcards generated successfully!');
    } catch (error) {
      setMessage('Error generating flashcards. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="text-primary fw-bold fs-3">StudySync</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                href="#studyPilot" 
                active={activeTab === 'studyPilot'}
                onClick={() => setActiveTab('studyPilot')}
              >
                <span className="me-1">🚀</span> StudyPilot
              </Nav.Link>
              <Nav.Link 
                href="#mindMap" 
                active={activeTab === 'mindMap'}
                onClick={() => setActiveTab('mindMap')}
              >
                Mind Map
              </Nav.Link>
              <Nav.Link 
                href="#studyAid" 
                active={activeTab === 'studyAid'}
                onClick={() => setActiveTab('studyAid')}
              >
                Study Aid
              </Nav.Link>
              <Nav.Link 
                href="#advancedTools" 
                active={activeTab === 'advancedTools'}
                onClick={() => setActiveTab('advancedTools')}
              >
                <span className="me-1">⚙️</span> Advanced Study Tools
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        {!flashcardsGenerated ? (
          <div className="my-4">
            <div className="text-center text-success mb-4">{message}</div>
            
            <div className="card p-4 shadow-sm">
              <h3 className="mb-3">Generate Flashcards from Transcript</h3>
              <Form.Group controlId="transcriptFile" className="mb-3">
                <Form.Label>Upload transcript file (.txt)</Form.Label>
                <Form.Control 
                  type="file" 
                  accept=".txt" 
                  onChange={handleFileUpload} 
                />
              </Form.Group>
              
              {transcript && (
                <div className="mb-3">
                  <h5>Transcript Preview:</h5>
                  <div className="border p-2 bg-light" style={{ maxHeight: '200px', overflow: 'auto' }}>
                    <pre>{transcript.substring(0, 500)}...</pre>
                  </div>
                </div>
              )}
              
              <Button 
                variant="primary" 
                onClick={generateFlashcards}
                disabled={isLoading || !transcript}
              >
                {isLoading ? 'Processing...' : 'Generate Flashcards'}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center text-success mb-4">{message}</div>
            <FlashcardDeck />
            <div className="text-center mt-4">
              <Button 
                variant="outline-secondary" 
                onClick={() => setFlashcardsGenerated(false)}
              >
                Upload New Transcript
              </Button>
            </div>
          </div>
        )}
      </Container>

      <footer className="border-top mt-5 py-3 text-center text-muted">
        © 2025 • Built with ❤️ by StudySync
      </footer>
    </div>
  );
}

export default App;