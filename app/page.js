'use client'
import React, {
  useState,
  useCallback
} from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  AppBar,
  Toolbar
} from "@mui/material";

const sidebarWidth = 260;

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [chatHistory] = useState([
    "Data Structures and Algorithms",
    "Java Programming Basics",
    "Object-Oriented Programming Concepts",
    "Web Development with React",
    "Introduction to Machine Learning",
    "Database Management Systems",
    "Software Design Patterns",
    "Version Control with Git",
    "RESTful API Development",
    "Python for Data Science",
    "Agile Software Development",
    "Computer Networks Fundamentals",
    "Mobile App Development",
    "Cloud Computing Essentials",
    "Cybersecurity Best Practices",
    "Big Data Analytics",
    "Artificial Intelligence in Software",
    "DevOps and Continuous Integration",
  ]);

  const suggestedPrompts = [
    "How to create a website",
    "Write me an email",
    "Java vs. JavaScript",
    "Activities to make friends in new city",
  ];

  const sendMessage = useCallback(async () => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'user',
        content: message
      },
    ]);
    setMessage('');

    try {
      console.log('Sending request to /api/chat');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, {
            role: 'user',
            content: message
          }]
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let paragraphs = [];

      // Add AI message placeholder
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: ''
        },
      ]);

      while (true) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        assistantMessage += decoder.decode(value);

        // Split the message into paragraphs and remove hashtags and stars
        paragraphs = assistantMessage
          .split('\n\n')
          .filter(p => p.trim() !== '')
          .map(p => p.replace(/^[#*]+\s*|[#*]+\s*$/g, '').trim());

        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: paragraphs,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: `Error: ${error.message}`
        },
      ]);
    }
  }, [message, messages]);

  return ( <
    Box sx = {
      {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }
    } >
    <
    AppBar position = "static"
    sx = {
      {
        bgcolor: '#f5f5f5'
      }
    } >
    <
    Toolbar sx = {
      {
        justifyContent: 'flex-end'
      }
    } >
    <
    Typography variant = "h6"
    component = "div"
    sx = {
      {
        color: 'text.primary'
      }
    } >
    AI Powered Assistant <
    /Typography> <
    /Toolbar> <
    /AppBar> <
    Box sx = {
      {
        display: 'flex',
        flexGrow: 1,
        bgcolor: '#f5f5f5'
      }
    } >
    <
    Drawer variant = "permanent"
    sx = {
      {
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          bgcolor: '#ffffff',
          color: 'black',
          borderRight: '1px solid #e0e0e0',
        },
      }
    } >
    <
    List > {
      chatHistory.map((text, index) => ( <
        ListItem button key = {
          text
        }
        sx = {
          {
            py: 0.5
          }
        } >
        <
        ListItemText primary = {
          text
        }
        primaryTypographyProps = {
          {
            fontSize: '0.9rem',
            color: 'black'
          }
        }
        /> <
        /ListItem>
      ))
    } <
    /List> <
    /Drawer> <
    Box component = "main"
    sx = {
      {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    } >
    <
    Stack direction = "column"
    spacing = {
      2
    }
    sx = {
      {
        flexGrow: 1,
        overflow: 'auto',
        p: 3,
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        scrollbarWidth: 'none',
      }
    } >
    {
      messages.length === 0 && ( <
        Box sx = {
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }
        } >
        <
        img src = "/placeholder-image.png"
        alt = "Background Logo"
        style = {
          {
            opacity: 0.1,
            width: '64px',
            height: '64px'
          }
        }
        /> <
        /Box>
      )
    } {
      messages.map((message, index) => ( <
        Box key = {
          index
        }
        display = "flex"
        justifyContent = {
          message.role === 'user' ? 'flex-end' : 'flex-start'
        } >
        <
        Paper elevation = {
          1
        }
        sx = {
          {
            p: 2,
            maxWidth: '70%',
            bgcolor: message.role === 'user' ? '#e3f2fd' : '#ffffff',
            color: 'black',
          }
        } >
        {
          Array.isArray(message.content) ? (
            message.content.map((paragraph, pIndex) => ( <
              Typography key = {
                pIndex
              }
              paragraph > {
                paragraph
              } <
              /Typography>
            ))
          ) : ( <
            Typography > {
              message.content
            } < /Typography>
          )
        } <
        /Paper> <
        /Box>
      ))
    } <
    /Stack> <
    Box sx = {
      {
        p: 2,
        bgcolor: '#f5f5f5'
      }
    } >
    <
    Stack direction = "row"
    spacing = {
      2
    }
    sx = {
      {
        mb: 2
      }
    } > {
      suggestedPrompts.map((prompt, index) => ( <
        Button key = {
          index
        }
        variant = "outlined"
        size = "small"
        onClick = {
          () => setMessage(prompt)
        }
        sx = {
          {
            textTransform: 'none',
            whiteSpace: 'nowrap',
            color: 'primary.main',
            borderColor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.light',
            }
          }
        } >
        {
          prompt
        } <
        /Button>
      ))
    } <
    /Stack> <
    Paper component = "form"
    sx = {
      {
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#ffffff',
        borderRadius: '8px',
      }
    } >
    <
    TextField fullWidth variant = "standard"
    placeholder = "Message ChatGPT..."
    value = {
      message
    }
    onChange = {
      (e) => setMessage(e.target.value)
    }
    onKeyPress = {
      (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      }
    }
    InputProps = {
      {
        disableUnderline: true,
        style: {
          color: 'black'
        }
      }
    }
    sx = {
      {
        ml: 1,
        flex: 1
      }
    }
    /> <
    IconButton sx = {
      {
        p: '10px',
        color: 'primary.main'
      }
    }
    aria - label = "attach file" > 📎
    <
    /IconButton> <
    IconButton color = "primary"
    aria - label = "send message"
    onClick = {
      sendMessage
    } > ➤
    <
    /IconButton> <
    /Paper> <
    Typography variant = "caption"
    sx = {
      {
        color: 'text.secondary',
        mt: 1,
        display: 'block',
        textAlign: 'center'
      }
    } >
    ChatGPT can make mistakes.Check important info. <
    /Typography> <
    /Box> <
    /Box> <
    /Box> <
    /Box>
  );
}