// static/js/chatbot.js
console.log('chatbot.js: Script start'); // <-- Add log
// Chatbot Conversation Flow
class ChatbotConversation {
  constructor(containerId) {
    console.log(`chatbot.js: ChatbotConversation constructor called with containerId: ${containerId}`); // <-- Add log
    this.container = document.getElementById(containerId);
    // --- Check if container exists ---
    if (!this.container) {
       console.error(`chatbot.js: ERROR - Container element with ID '${containerId}' not found.`);
       throw new Error(`Chatbot container #${containerId} not found.`); // Stop execution if essential container missing
    }
      this.messagesContainer = null;
      this.inputContainer = null;
      this.inputField = null;
      this.sendButton = null;
      this.typingIndicator = null;
      this.messageHistory = [];
      this.currentStep = null; // Tracks the step *within* the booking flow
      this.appointment = {};
      this.isTyping = false;
      this.showTypingTimeout = null;

      // === NEW STATE VARIABLE ===
      this.isInBookingFlow = false; // Tracks if we are in conversation mode or booking mode

      // --- Existing Data Initialization ---
      this.practiceAreas = { // Keep for button generation in booking flow
          "Family Law": { subAreas: ["Prenuptial Agreement", "Separation/Divorce Agreement", "Matrimonial Properties Division", "Child Support", "Spouse Support", "Divorce Order", "Divorce Litigation"] },
          "Corporate & Commercial Law": { subAreas: ["Incorporation and Maintenance", "Commercial Contract Drafting", "Employment contract", "Shareholder Agreement", "Partnership Agreement", "Purchase and sale of businesses", "Commercial Lending", "Corporate Restructuring", "Franchise agreement"] },
          "Civil Litigation": { subAreas: ["Defamation", "Debt collection", "Shareholder disputes", "Construction and real estate disputes", "Contract disputes", "Fraud claims", "Estate litigations"] },
          "Conveyancing": { subAreas: ["Residential purchase and sale", "Residential mortgages including refinancing", "LOTR filing", "Commercial real estate purchase and sale"] },
          "Wills, Trust & Estates": { subAreas: ["Wills", "Representation Agreements", "Probate with and without will", "Estate Planning", "Document authentication with embassies", "Power of Attorney"] }
      };
      this.lawyers = [ // Keep for button generation
          {name: "Adele", languages: ["Mandarin", "English"]},
          {name: "David", languages: ["Mandarin", "English"]},
          {name: "Corey", languages: ["English", "Cantonese"]},
          {name: "Nicole", languages: ["English"]},
          {name: "Olivia", languages: ["English"]},
          {name: "Freja Li", languages: ["Mandarin", "English"]},
          {name: "Howard Qu", languages: ["Mandarin", "English"]},
          {name: "Rachel", languages: ["Mandarin", "English", "Cantonese"]},
          {name: "Dummy", languages: ["English"]},
          {name: "Richard", languages: ["Mandarin", "English"]}
      ];
      this.availableSlots = {}; // Fetched during booking flow
      // --- End Existing Data Initialization ---

      // Audio elements (ensure paths are correct or handle errors)


      this.init();
  }

  // Initialize the chatbot UI (Mostly Unchanged)
  init() {
    console.log('chatbot.js: init() called'); // <-- Add log
    // --- Check if container exists (again, safeguard) ---
    if (!this.container) {
        console.error("chatbot.js: ERROR - Cannot init, container not found.");
        return;
    }
    // --- End check ---

    // Prevent re-initialization if UI already exists within container
    if (this.container.querySelector('.chat-container')) {
        console.warn("chatbot.js: init() - Chat container already exists. Aborting re-initialization.");
        return;
    }
      // ... (UI creation code remains largely the same) ...
       // Create chat container
      const chatContainer = document.createElement('div');
      chatContainer.className = 'chat-container'; 
      this.container.appendChild(chatContainer);

      // Create messages container
      this.messagesContainer = document.createElement('div');
      this.messagesContainer.className = 'chat-messages';
      chatContainer.appendChild(this.messagesContainer);

      // Auto-scroll observer (Unchanged)
      const observer = new MutationObserver(() => { this.scrollToBottom(); });
      observer.observe(this.messagesContainer, { childList: true, subtree: true, characterData: true });

      // Create typing indicator (Unchanged)
      this.typingIndicator = document.createElement('div');
      this.typingIndicator.className = 'typing-indicator';
      this.typingIndicator.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
      this.typingIndicator.style.display = 'none'; // Start hidden
      this.messagesContainer.appendChild(this.typingIndicator); // Append it initially

      // Create input area (Unchanged)
      const inputArea = document.createElement('div');
      inputArea.className = 'chat-input-area';
      chatContainer.appendChild(inputArea);

      // Create input container (Unchanged)
      this.inputContainer = document.createElement('div');
      this.inputContainer.className = 'chat-input-container';
      inputArea.appendChild(this.inputContainer);

      // Create input field (Unchanged, except maybe add initial focus)
      this.inputField = document.createElement('textarea');
      this.inputField.className = 'chat-input';
      this.inputField.placeholder = 'Ask anything'; // Update placeholder
      this.inputField.rows = 1;
      this.inputField.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              this.sendMessage();
          }
          // Auto-resize input field (Unchanged)
          setTimeout(() => {
              this.inputField.style.height = 'auto';
              this.inputField.style.height = Math.min(this.inputField.scrollHeight, 100) + 'px';
          }, 0);
      });
      this.inputContainer.appendChild(this.inputField);
      // Optional: Focus input field when chat opens
      // setTimeout(() => this.inputField.focus(), 100);


      // Create send button (Unchanged)
      this.sendButton = document.createElement('button');
      this.sendButton.className = 'chat-send-button';
      this.sendButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
      this.sendButton.addEventListener('click', () => this.sendMessage());
      this.inputContainer.appendChild(this.sendButton);

      // Restore or Start Conversation (Modified slightly)
    //   if (chatbotInstance && chatbotInstance.messageHistory && chatbotInstance.messageHistory.length > 0) {
    //       // Restore previous messages
    //       chatbotInstance.messageHistory.forEach(msg => {
    //           this._renderMessage(msg.message, msg.sender, false); // Don't animate restored messages
    //       });
    //        // Restore state flags and data
    //       this.isInBookingFlow = chatbotInstance.isInBookingFlow || false;
    //       this.currentStep = chatbotInstance.currentStep || null;
    //       this.appointment = chatbotInstance.appointment || {};
    //       this.availableSlots = chatbotInstance.availableSlots || {};

    //       // If restored state was mid-booking, potentially re-render the last prompt?
    //       // For simplicity now, we don't automatically re-render prompts on load.
    //       // The user might need to re-trigger the last action or restart booking.
    //       console.log("Chat restored. isInBookingFlow:", this.isInBookingFlow, "currentStep:", this.currentStep);
    //       this.scrollToBottom(true); // Scroll immediately without smooth behavior

    //   } else {
          console.log("chatbot.js: Starting new conversation.");
          this.startConversation(); // Start fresh
    //   }
  }
  simulateUserMessage(message) {
    // Don't simulate if already in the booking flow from a previous action
    if (this.isInBookingFlow) {
        console.warn("simulateUserMessage called while isInBookingFlow is true. Ignoring.");
        return;
    }

    console.log(`Simulating user message: ${message}`);
    // 1. Display the simulated message in the chat
    this.addUserMessage(message);

    // 2. Trigger the backend interaction (logic adapted from sendMessage's 'else' block)
    console.log("Sending simulated message to /api/chat:", message);
    this.showTyping();
    if (this.sendButton) this.sendButton.disabled = true; // Disable send button visually

    fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log("Received response from /api/chat (simulated):", data);
        this.hideTyping();
        if (this.sendButton) this.sendButton.disabled = false; // Re-enable send button

        if (data && data.type === 'signal' && data.action === 'start_booking') {
            // --- BACKEND SIGNALED TO START BOOKING ---
            console.log("Booking signal received from simulated message. Transitioning.");
            this.isInBookingFlow = true;
            // Add a small transition message before starting the flow
            this.addBotMessage("Okay, let's start the booking process.", 500);
            setTimeout(() => {
                this.renderSmsVerification(); // Start the booking UI flow
            }, 800);

        } else if (data && data.type === 'message' && data.text) {
            // --- REGULAR TEXT RESPONSE FROM AGENT ---
            this.addBotMessage(data.text);

        } else {
            // Handle unexpected response format
            console.error("Unexpected response format from /api/chat (simulated):", data);
            this.addBotMessage("Sorry, I received an unusual response. Please try asking differently.");
        }
         this.saveState(); // Save state after processing response
    })
    .catch(error => {
        console.error('Error fetching /api/chat (simulated):', error);
        this.hideTyping();
        if (this.sendButton) this.sendButton.disabled = false; // Re-enable send button on error
        this.addBotMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 500);
         this.saveState(); // Save state even on error
    });
  }
  // Start the conversation with a welcome message (Modified to maybe add initial Q?)
  startConversation() {
      this.isInBookingFlow = false; // Ensure starting in conversation mode
      this.currentStep = null;
      this.appointment = {};
      this.messageHistory = [];

      this.addBotMessage("👋 Hi there! I'm Eve, your virtual assistant for Avid Law Corporation. How can I help you today? Feel free to ask about our services, lawyers, or book an appointment.", 500);
      // No automatic jump to SMS verification anymore.
      // --- Add Guide Buttons ---
      setTimeout(() => {
        const optionsContainer = document.createElement('div');
        // Use existing class for styling, maybe add another for specificity if needed
        optionsContainer.className = 'chat-options initial-guide-buttons';

        // Button 1: Introduce Company
        const introButton = document.createElement('button');
        introButton.className = 'chat-option-button'; // Reuse class
        introButton.textContent = "Introduce Company";
        introButton.addEventListener('click', () => {
            console.log("Introduce Company button clicked");
            // Optional: Remove the buttons once one is clicked
            optionsContainer.remove();
            // Simulate the user sending the message
            this.simulateUserMessage("introduce company");
        });
        optionsContainer.appendChild(introButton);

        // Button 2: Book Consultation
        const bookButton = document.createElement('button');
        bookButton.className = 'chat-option-button'; // Reuse class
        bookButton.textContent = "Book Consultation";
        bookButton.addEventListener('click', () => {
            console.log("Book Consultation button clicked");
            // Optional: Remove the buttons once one is clicked
            optionsContainer.remove();
            // Simulate the user sending the message
            this.simulateUserMessage("book consultation");
        });
        optionsContainer.appendChild(bookButton);

        // Append the container with both buttons to the last bot message
        this.appendToLastBotMessage(optionsContainer);

      }, 700); // Delay slightly longer than the message display time
      // --- End Add Guide Buttons ---
  }

  // Show typing indicator (Unchanged)
  showTyping() {
      // Only show if not already typing
      if (!this.isTyping) {
          this.isTyping = true;
          // Ensure typing indicator is the last element for correct positioning
          this.messagesContainer.appendChild(this.typingIndicator);
          this.typingIndicator.style.display = 'flex';
          this.typingIndicator.classList.add('visible'); // Use class for visibility control

          this.scrollToBottom(); // Scroll to show indicator
      }
  }

  // Hide typing indicator (Unchanged)
  hideTyping() {
      if (this.isTyping) {
          this.isTyping = false;
          this.typingIndicator.style.display = 'none';
           this.typingIndicator.classList.remove('visible');

          // Don't need explicit scroll here, adding message will scroll
      }
  }

  // Add a message from the bot (Unchanged)
  addBotMessage(message, delay = 0) {
      if (delay > 0) {
        this.showTyping();
        setTimeout(() => {
          this.hideTyping();
          this._renderMessage(message, 'bot');
          this.scrollToBottom(); // Ensure scroll after delay
        }, delay);
      } else {
        // If currently typing, hide typing before adding message
        if (this.isTyping) this.hideTyping();
        this._renderMessage(message, 'bot');
        this.scrollToBottom(); // Ensure scroll for immediate messages
      }
  }

  // Add a message from the user (Unchanged)
  addUserMessage(message) {
      this._renderMessage(message, 'user');
      this.scrollToBottom();
  }

  // Helper method to scroll to bottom (Added immediate flag)
  scrollToBottom(immediate = false) {
      const behavior = immediate ? 'auto' : 'smooth';
      requestAnimationFrame(() => {
          this.messagesContainer.scrollTo({ top: this.messagesContainer.scrollHeight, behavior: behavior });
          // Second attempt after delay might still be needed for complex renders
          setTimeout(() => {
             this.messagesContainer.scrollTo({ top: this.messagesContainer.scrollHeight, behavior: behavior });
          }, behavior === 'smooth' ? 200 : 50);
      });
  }

  // Render a message in the chat (Added optional animation flag)
  _renderMessage(message, sender, animate = true) {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${sender}`;
      if (!animate) {
          bubble.style.opacity = 1; // Show immediately if not animating
          bubble.style.animation = 'none';
      }

      const messageEl = document.createElement('div');
      messageEl.className = 'chat-message';
      // Basic sanitization (replace with a proper library like DOMPurify if security is critical)
      const sanitizedMessage = message.replace(/</g, "<").replace(/>/g, ">");
      messageEl.innerHTML = sanitizedMessage.replace(/\n/g, "<br>"); // Render newlines
      bubble.appendChild(messageEl);

      // Insert before typing indicator
      this.messagesContainer.insertBefore(bubble, this.typingIndicator);

      // Save message to history
      this.messageHistory.push({ sender, message });

      // Update global instance state (Important for persistence if chat is closed/reopened)
      this.saveState();

      // Scroll handled by MutationObserver or explicitly after adding messages
  }

  // === Send a message (MAJOR CHANGE) ===
  sendMessage() {
      const message = this.inputField.value.trim();
      if (!message) return;

      // Display user's message immediately
      this.addUserMessage(message);
      this.inputField.value = ''; // Clear input
      this.inputField.style.height = 'auto'; // Reset height
      this.inputField.focus(); // Keep focus on input

      console.log(`Sending message. isInBookingFlow: ${this.isInBookingFlow}`);

      if (this.isInBookingFlow) {
          // --- We are in the booking process ---
          // Use existing logic to handle expected inputs (like verification code)
          console.log("Processing message within booking flow:", message);
          this.processUserMessage(message);

      } else {
          // --- We are in conversational mode ---
          console.log("Sending message to /api/chat:", message);
          this.showTyping(); // Show typing while waiting for backend
          this.sendButton.disabled = true; // Disable send button during request

          fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/chat', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: message }),
          })
          .then(response => {
              if (!response.ok) {
                  // Handle HTTP errors (e.g., 500 Internal Server Error)
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              console.log("Received response from /api/chat:", data);
              this.hideTyping();
              this.sendButton.disabled = false; // Re-enable send button

              if (data && data.type === 'signal' && data.action === 'start_booking') {
                  // --- BACKEND SIGNALED TO START BOOKING ---
                  console.log("Booking signal received. Transitioning to booking flow.");
                  this.isInBookingFlow = true;
                  this.addBotMessage("Okay, let's start the booking process.", 500); // Optional transition message
                  // Start the first step of the *existing* booking UI flow
                  setTimeout(() => {
                      this.renderSmsVerification(); // Or whichever function starts your booking UI
                  }, 800); // Delay slightly after transition message

              } else if (data && data.type === 'message' && data.text) {
                  // --- REGULAR TEXT RESPONSE FROM AGENT ---
                  this.addBotMessage(data.text);

              } else {
                  // Handle unexpected response format
                  console.error("Unexpected response format from /api/chat:", data);
                  this.addBotMessage("Sorry, I received an unusual response. Please try again.");
              }
               this.saveState(); // Save state after processing response
          })
          .catch(error => {
              console.error('Error fetching /api/chat:', error);
              this.hideTyping();
              this.sendButton.disabled = false; // Re-enable send button on error
              this.addBotMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 500);
               this.saveState(); // Save state even on error
          });
      }
  }

  // Update the global instance with current state (Unchanged)
  saveState() {
      if (typeof chatbotInstance !== 'undefined' && chatbotInstance) {
          chatbotInstance.messageHistory = [...this.messageHistory]; // Copy history
          chatbotInstance.currentStep = this.currentStep;
          chatbotInstance.appointment = {...this.appointment};
          chatbotInstance.availableSlots = {...this.availableSlots};
          chatbotInstance.isInBookingFlow = this.isInBookingFlow;
          // console.log("Chatbot state saved."); // Optional: for debugging persistence
      }
  }

  // === Process user message (SIMPLIFIED) ===
  // This now primarily handles *typed input* during the booking flow,
  // as button clicks trigger their own functions directly.
  processUserMessage(message) {
      console.log(`Processing user message during booking flow. Step: ${this.currentStep}, Message: ${message}`);

      // Only handle steps where typed input is expected
      switch(this.currentStep) {
          case 'sms_verification_prompt': // A new step name for when waiting for the code
              if (/^\d{6}$/.test(message)) {
                  console.log("Processing 6-digit code for verification.");
                  // API call is handled within promptForVerificationCode's button now.
                  // If we want to allow *typing* the code as well, we need to call verify here.
                  // Let's assume the user clicks the verify button for now.
                  // Re-prompt if they type something else?
                  this.addBotMessage("Please use the 'Verify' button after entering the 6-digit code.", 500);
              } else {
                  this.addBotMessage("Please enter the 6-digit verification code and click 'Verify'.", 500);
              }
              break;

          case 'client_name_prompt': // If we use a specific step name for name prompt
               if (message.length > 1) { // Basic check
                  // Similar to SMS code, assume submit button is used.
                  this.addBotMessage("Please use the 'Submit' button after entering your name.", 500);
               } else {
                  this.addBotMessage("Please enter your full name and click 'Submit'.", 500);
               }
               break;

          // REMOVE cases like 'area_selection', 'sub_area_selection' as they are
          // handled by button clicks within the booking flow now. The conversation
          // leading to this point is handled by the Agno agent via /api/chat.

          default:
              // If in booking flow but no specific step matches typed input,
              // guide the user back to using buttons.
              console.log("User typed during booking flow, but no specific input expected for step:", this.currentStep);
              this.addBotMessage("Please use the buttons provided to continue booking.", 800);
              break;
      }
       this.saveState(); // Save state after processing
  }

  // --- UI Rendering Helper Functions (Unchanged) ---
  createOptionButtons(options, onSelect, container = null) { /* ... */
      console.log("createOptionButtons called");
      const optionsContainer = container || document.createElement('div');
      optionsContainer.className = 'chat-options';

      options.forEach(optionText => { // Use different variable name
          const button = document.createElement('button');
          button.className = 'chat-option-button';
          button.textContent = optionText; // Use the text directly
          button.addEventListener('click', () => onSelect(optionText)); // Pass the text
          optionsContainer.appendChild(button);
      });
      return optionsContainer;
  }
  createBackButton(label, onClick) { /* ... */
      console.log("createBackButton called");
      const button = document.createElement('button');
      button.className = 'back-button';
      button.textContent = label;
      button.addEventListener('click', onClick);
      return button;
   }
  appendToLastBotMessage(element) { /* ... */
      // Find the last bot message bubble
      console.log("appendToLastBotMessage called");
      const allBotMessages = this.messagesContainer.querySelectorAll('.chat-bubble.bot');
      if (allBotMessages.length > 0) {
          const lastBotBubble = allBotMessages[allBotMessages.length - 1];
          // Check if it already has an options container or similar interactive element
          const existingInteractive = lastBotBubble.querySelector('.chat-options, .phone-input-container, .code-input-container, .name-input-container, .datetime-container, .action-buttons-container');

          // Append to the message content div within the bubble
          const messageElement = lastBotBubble.querySelector('.chat-message');
          if (messageElement) {
               // If appending interactive element, add some top margin if needed
              if (element.classList.contains('chat-options') || element.classList.contains('phone-input-container') || element.classList.contains('code-input-container') || element.classList.contains('name-input-container') || element.classList.contains('datetime-container')) {
                   // Check if the message already has content to add margin
                   if (messageElement.innerHTML.trim().length > 0 && !existingInteractive) {
                       element.style.marginTop = '12px';
                   }
              }
              messageElement.appendChild(element);
              this.scrollToBottom(); // Scroll after adding element
          } else {
              console.error("Could not find .chat-message within the last bot bubble to append to.");
              lastBotBubble.appendChild(element); // Fallback
              this.scrollToBottom();
          }
      } else {
          console.error("No bot messages found to append to.");
          // Fallback: Add as a new bot message? Or just log error?
          // Creating a new message might be better than appending to the main container.
          this._renderMessage('', 'bot'); // Create an empty bubble
           const newBubble = this.messagesContainer.querySelector('.chat-bubble.bot:last-child .chat-message');
           if(newBubble) newBubble.appendChild(element);
          this.scrollToBottom();
      }
   }

  // --- Booking Flow Steps (Mostly Unchanged Logic, but initiated differently) ---

  // Render SMS Verification step (First step of booking flow)
  renderSmsVerification() {
      this.currentStep = 'sms_verification_input'; // Step name for awaiting phone input
      console.log("Rendering SMS Verification Step");

      this.addBotMessage("Before we proceed with booking, please enter your 10-digit phone number (without +1) so we can verify it.", 800);

      // Create phone number input container
      const phoneContainer = document.createElement('div');
      phoneContainer.className = 'phone-input-container';

      // Create phone input group
      const phoneInputGroup = document.createElement('div');
      phoneInputGroup.className = 'phone-input-group';

      const areaCodePrefix = document.createElement('div');
      areaCodePrefix.className = 'area-code-prefix';
      areaCodePrefix.textContent = '+1';
      phoneInputGroup.appendChild(areaCodePrefix);

      const phoneInput = document.createElement('input');
      phoneInput.type = 'tel'; // Use tel for numeric keyboard on mobile
      phoneInput.className = 'phone-input';
      phoneInput.placeholder = 'Enter 10 digits...';
      phoneInput.pattern = "\\d{10}"; // Pattern for validation hint
      phoneInput.maxLength = 10;
      phoneInput.addEventListener('input', () => { // Basic input filtering
          phoneInput.value = phoneInput.value.replace(/\D/g,'');
      });
      phoneInputGroup.appendChild(phoneInput);
      phoneContainer.appendChild(phoneInputGroup);

      // Create send verification button
      const sendCodeBtn = document.createElement('button');
      sendCodeBtn.className = 'chat-option-button';
      sendCodeBtn.textContent = "Send verification code";
      sendCodeBtn.style.marginTop = '8px'; // Add some space
      sendCodeBtn.addEventListener('click', () => {
          const phoneNumber = phoneInput.value.trim();
          // Validate 10 digits
          if (!/^\d{10}$/.test(phoneNumber)) {
              this.addBotMessage("Please enter a valid 10-digit phone number.", 400);
              return;
          }

          // Disable button temporarily
          sendCodeBtn.disabled = true;
          sendCodeBtn.textContent = "Sending...";

          this.appointment.phone = phoneNumber; // Store the 10-digit number
          this.addUserMessage('+1 ' + phoneNumber); // Display user input
          this.addBotMessage("Sending verification code...", 500);

          // Call API
          fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/send-verification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ phone: phoneNumber }), // Send 10 digits
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  this.promptForVerificationCode(phoneNumber); // Proceed to code input
              } else {
                  this.addBotMessage(`Error: ${data.message || 'Could not send code'}. Please check the number and try again.`, 500);
                  // Re-enable button on failure
                  sendCodeBtn.disabled = false;
                  sendCodeBtn.textContent = "Send verification code";
              }
          })
          .catch(error => {
              console.error('Error sending verification:', error);
              this.addBotMessage("There was a problem sending the code. Please try again.", 500);
              // Re-enable button on failure
              sendCodeBtn.disabled = false;
              sendCodeBtn.textContent = "Send verification code";
          });
      });
      phoneContainer.appendChild(sendCodeBtn);

      // Add phone input UI to the last bot message
      setTimeout(() => {
          this.appendToLastBotMessage(phoneContainer);
          phoneInput.focus(); // Focus the input field
      }, 900);
       this.saveState();
  }

  // Prompt for verification code
  promptForVerificationCode(phoneNumber) {
      this.currentStep = 'sms_verification_prompt'; // State while waiting for code input
      this.addBotMessage(`We've sent a 6-digit verification code to +1 ${phoneNumber}. Please enter it below:`, 800);

      const codeContainer = document.createElement('div');
      codeContainer.className = 'code-input-container'; // Use existing class if suitable

      const codeInput = document.createElement('input');
      codeInput.type = 'text'; // Use text to allow easier input/paste
      codeInput.className = 'code-input'; // Use existing class
      codeInput.placeholder = '6-digit code';
      codeInput.maxLength = 6;
       codeInput.pattern = "\\d{6}"; // Validation hint
       codeInput.addEventListener('input', () => { // Basic input filtering
          codeInput.value = codeInput.value.replace(/\D/g,'');
       });
      codeContainer.appendChild(codeInput);

      const verifyBtn = document.createElement('button');
      verifyBtn.className = 'chat-option-button';
      verifyBtn.textContent = "Verify";
      verifyBtn.style.marginTop = '8px';
      verifyBtn.addEventListener('click', () => {
          const code = codeInput.value.trim();
          if (!/^\d{6}$/.test(code)) {
              this.addBotMessage("Please enter the 6-digit code.", 400);
              return;
          }

          // Disable button
          verifyBtn.disabled = true;
          verifyBtn.textContent = "Verifying...";

          this.addUserMessage(code); // Show code entered by user
          this.addBotMessage("Verifying code...", 500);

          // Call API
          fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/verify-code', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  phone: phoneNumber, // Send 10 digits
                  code: code
              }),
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  this.addBotMessage("✅ Phone number verified successfully!", 800);
                  // Proceed to check existing appointments
                  this.checkExistingAppointments(phoneNumber);
              } else {
                  this.addBotMessage(`Verification failed: ${data.message || 'Invalid code'}. Please check the code and try again.`, 500);
                  // Re-enable button, keep input
                  verifyBtn.disabled = false;
                  verifyBtn.textContent = "Verify";
                  codeInput.focus(); // Refocus input
                  codeInput.select(); // Select existing text
              }
          })
          .catch(error => {
              console.error('Error verifying code:', error);
              this.addBotMessage("There was a problem verifying the code. Please try again.", 500);
               verifyBtn.disabled = false;
               verifyBtn.textContent = "Verify";
          });
      });
      codeContainer.appendChild(verifyBtn);

      // Add code input UI
      setTimeout(() => {
          this.appendToLastBotMessage(codeContainer);
          codeInput.focus(); // Focus input
      }, 900);
       this.saveState();
  }

    // Check for existing appointments (Modified unpaid handling)
    checkExistingAppointments(phoneNumber) {
      console.log("Checking existing appointments for:", phoneNumber);
      this.currentStep = 'checking_appointments';
      this.addBotMessage("Checking your appointment history...", 800);

      fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/check-appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: phoneNumber }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              const { hasAppointments, appointments, hasUnpaidAppointments } = data;
              console.log("Appointment check result:", data);

              if (!hasAppointments) {
                  // --- No Appointments: Proceed to book ---
                  this.addBotMessage("No upcoming appointments found. Let's book a new one!", 800);
                  setTimeout(() => this.renderStep1(), 1000);

              } else if (hasUnpaidAppointments) {
                  // --- Has Unpaid Appointments: Show message with e-transfer & cost ---

                  const unpaidAppointmentsHTML = this.formatAppointmentsList(appointments.filter(app => app.paid === 'No'));

                  // === START MODIFICATION ===
                  const message = `
                      <p>⚠️ It looks like you have one or more previous consultations that haven't been paid for yet:</p>
                      ${unpaidAppointmentsHTML}
                      <p>To book a new appointment, please settle the outstanding amount(s) first. First 30-minute consultation is <strong>$268 CAD (tax included)</strong>.</p>
                      <p>You can make the payment via e-transfer using the details below:</p>
                      <div class="payment-instructions">
                          <p><strong>E-transfer Details:</strong></p>
                          <ul>
                              <li><strong>Recipient Email:</strong> accounting@avid-law.com</li>
                              <li><strong>Password:</strong> 123456</li>
                              <li><strong>Message/Memo:</strong> Your Full Name & Appointment ID(s) (${appointments.filter(app => app.paid === 'No').map(app => app.meetingID || 'N/A').join(', ')})</li>
                          </ul>
                          <p><strong>Important:</strong> Please also email a screenshot of the completed transaction to info@avid-law.com.</p>
                      </div>
                      <p>Once the payment is confirmed, feel free to start a new chat or let me know here, and we can proceed with booking your next appointment. You can also ask me other questions in the meantime.</p>
                  `;

                  this.addBotMessage(message, 800);
                  this.scrollToBottom(true); // Ensure full message is visible

                  // **NO BUTTONS ADDED HERE** - User can continue chatting or pay and come back.
                  this.currentStep = 'awaiting_payment_confirmation_or_chat'; // Set a state if needed
                  this.isInBookingFlow = false; // Allow conversational interaction again

                  // === END MODIFICATION ===

              } else {
                  // --- Has Paid Appointments: Ask to book more ---
                  const appointmentsHTML = this.formatAppointmentsList(appointments);
                  const message = `<p>You have these upcoming paid appointments:</p>${appointmentsHTML}<p>Would you like to book another?</p>`;
                  this.addBotMessage(message, 800);
                  this.promptBookAnotherOrEnd(); // Keep this function as is
              }
          } else {
              console.error('Error checking appointments:', data.message);
              this.addBotMessage("Couldn't check your appointment history, but we can proceed with booking a new one.", 800);
              setTimeout(() => this.renderStep1(), 1000);
          }
           this.saveState(); // Save state after processing
      })
      .catch(error => {
          console.error('Error fetching appointments:', error);
          this.addBotMessage("There was a network problem checking appointments. Let's try booking a new one.", 800);
          setTimeout(() => this.renderStep1(), 1000);
           this.saveState(); // Save state on error
      });
  }
  promptBookAnotherOrEnd() {
    this.currentStep = 'awaiting_book_more_action';
    setTimeout(() => {
         const optionsContainer = document.createElement('div');
         optionsContainer.className = 'chat-options'; // Use standard options container

         // Button 1: Use standard chat-option-button class
         const bookMoreBtn = document.createElement('button');
         bookMoreBtn.className = 'chat-option-button'; // Standard class
         bookMoreBtn.textContent = "Yes, Book Another";
         bookMoreBtn.style.flexGrow = '1'; // Allow to grow if needed
         bookMoreBtn.addEventListener('click', () => {
             this.addUserMessage("Yes, Book Another");
             this.addBotMessage("Great, let's start the process again.", 500);
             this.renderStep1(); // Restart booking UI flow
         });

         // Button 2: Use the helper which applies .back-button class
         const endChatBtn = this.createEndChatButton("No, End Chat"); // Helper applies red style
         endChatBtn.style.flexGrow = '1'; // Allow to grow if needed


         optionsContainer.appendChild(bookMoreBtn);
         optionsContainer.appendChild(endChatBtn);
         this.appendToLastBotMessage(optionsContainer);
         this.scrollToBottom(true); // Ensure scroll
    }, 900);
     this.saveState();
}


  // Format appointments list (Unchanged)
  formatAppointmentsList(appointments) { /* ... */
      let html = '<div class="appointments-list">';
      if (!appointments || appointments.length === 0) {
          return '<p>No appointments found.</p>'; // Handle empty list
      }
      appointments.forEach(appointment => {
          const isPaid = appointment.paid === 'Yes';
          // Add checks for potentially missing data
          const dateTime = appointment.datetime || 'N/A';
          const lawyerName = appointment.lawyerName || 'N/A';
          const meetingID = appointment.meetingID || 'N/A';
          const paymentStatusText = isPaid ? 'Paid' : 'Unpaid';

          html += `
              <div class="appointment-item ${isPaid ? 'paid' : 'unpaid'}">
                  <p><strong>Date/Time:</strong> ${dateTime}</p>
                  <p><strong>Lawyer:</strong> ${lawyerName}</p>
                  <p><strong>Appointment ID:</strong> ${meetingID}</p>
                  <p><strong>Payment Status:</strong> <span class="payment-status ${isPaid ? 'paid' : 'unpaid'}">${paymentStatusText}</span></p>
              </div>`;
      });
      html += '</div>';
      return html;
   }

  // --- Booking UI Steps (Render Area, SubArea, Method, Office, Language, Lawyer, DateTime, Confirmation) ---
  // The internal logic of these functions remains mostly the same as they
  // primarily deal with rendering buttons and handling clicks to update
  // the `this.appointment` object and progress to the next step.
  // Ensure `this.currentStep` is updated appropriately in each function.

  renderStep1() { /* Choose Area */
      this.currentStep = 'area_selection';
      console.log("Rendering Step 1: Area Selection");
      this.addBotMessage("Let's start by choosing the area of law you need help with:", 800);
      const areas = Object.keys(this.practiceAreas);
      const optionsContainer = this.createOptionButtons(areas, (selectedArea) => {
          this.appointment.area = selectedArea;
          this.addUserMessage(selectedArea); // Show user selection
          this.renderSubAreas(selectedArea);
      });
      setTimeout(() => this.appendToLastBotMessage(optionsContainer), 900);
      this.saveState();
  }

  renderSubAreas(area) { /* Choose SubArea */
      this.currentStep = 'sub_area_selection';
      console.log("Rendering Sub-Area Selection for:", area);
      this.addBotMessage(`Okay, for ${area}, please select a specific topic:`, 800);
      const subAreas = this.practiceAreas[area]?.subAreas || []; // Handle missing area defensively
      if (subAreas.length === 0) {
          this.addBotMessage("No specific topics listed for this area. Proceeding...", 500);
          this.appointment.sub_area = "General Inquiry"; // Assign default
          setTimeout(() => this.renderStep2(), 800);
          return;
      }
      const optionsContainer = this.createOptionButtons(subAreas, (selectedSubArea) => {
          this.appointment.sub_area = selectedSubArea;
          this.addUserMessage(selectedSubArea);
          this.renderStep2();
      });
      const backButton = this.createBackButton("Go Back", () => this.renderStep1());
      backButton.style.marginTop = '15px'; // Add margin-top directly here
      setTimeout(() => {
          this.appendToLastBotMessage(optionsContainer);
          this.appendToLastBotMessage(backButton);
      }, 900);
      this.saveState();
  }

  renderStep2() { /* Choose Method */
      this.currentStep = 'method_selection';
      console.log("Rendering Step 2: Method Selection");
      this.addBotMessage("How would you like to connect?", 800);
      const methods = ["In-Person", "Phone", "Zoom"];
      const optionsContainer = this.createOptionButtons(methods, (selectedMethod) => {
          this.appointment.connection_method = selectedMethod;
          this.addUserMessage(selectedMethod);
          if (selectedMethod === "In-Person") this.renderOfficeSelection();
          else {
              this.appointment.office_location = null; // Clear location if not in-person
              this.renderStep3Language();
          }
      });
      const backButton = this.createBackButton("Go Back", () => this.renderSubAreas(this.appointment.area));
      setTimeout(() => {
          this.appendToLastBotMessage(optionsContainer);
          this.appendToLastBotMessage(backButton);
      }, 900);
      this.saveState();
  }

  renderOfficeSelection() { /* Choose Office (if In-Person) */
      this.currentStep = 'office_selection';
      console.log("Rendering Office Selection");
      this.addBotMessage("Please choose the office location:", 800);
      const offices = ["Cooney Office", "Aberdeen Satellite Office"]; // Ensure these are correct
      const optionsContainer = this.createOptionButtons(offices, (selectedOffice) => {
          this.appointment.office_location = selectedOffice;
          this.addUserMessage(selectedOffice);
          this.renderStep3Language();
      });
      const backButton = this.createBackButton("Go Back", () => this.renderStep2());
      backButton.style.marginTop = '15px'; // Add margin-top directly here
      setTimeout(() => {
          this.appendToLastBotMessage(optionsContainer);
          this.appendToLastBotMessage(backButton);
      }, 900);
      this.saveState();
  }

  renderStep3Language() { /* Choose Language */
      this.currentStep = 'language_selection';
      console.log("Rendering Language Selection");
      this.addBotMessage("Select your preferred appointment language:", 800);
      const languages = ["Any Language", "English", "Mandarin", "Cantonese"];
      const optionsContainer = this.createOptionButtons(languages, (selectedLanguage) => {
          this.appointment.language = selectedLanguage;
          this.addUserMessage(selectedLanguage);
          this.renderStep3Lawyer();
      });
      const backButton = this.createBackButton("Go Back", () => {
          if (this.appointment.connection_method === "In-Person") this.renderOfficeSelection();
          else this.renderStep2();
      });
      backButton.style.marginTop = '15px'; // Add margin-top directly here
      setTimeout(() => {
           this.appendToLastBotMessage(optionsContainer);
           this.appendToLastBotMessage(backButton);
      }, 900);
      this.saveState();
  }

  renderStep3Lawyer() { /* Choose Lawyer */
      this.currentStep = 'lawyer_selection';
      console.log("Rendering Lawyer Selection");
      this.addBotMessage("Choose your preferred lawyer, or select 'Any Lawyer'.", 800);

      let filteredLawyers = this.lawyers;
      if (this.appointment.language && this.appointment.language !== "Any Language") {
          filteredLawyers = this.lawyers.filter(lawyer => lawyer.languages.includes(this.appointment.language));
      }

      if (filteredLawyers.length === 0) {
           this.addBotMessage(`No lawyers available for ${this.appointment.language}. Please select 'Any Language' or go back.`, 800);
           // Force 'Any Language' or go back? Let's offer 'Any Language' and back.
           const lawyerOptions = ["Any Language"];
           const optionsContainer = this.createOptionButtons(lawyerOptions, (selectedLawyer) => { /* ... handler as below ... */ });
           const backButton = this.createBackButton("Go Back", () => this.renderStep3Language());
           backButton.style.marginTop = '15px'; // Add margin-top directly here
           setTimeout(() => { this.appendToLastBotMessage(optionsContainer); this.appendToLastBotMessage(backButton);}, 900);
           return; // Don't proceed further
      }

      const lawyerOptions = ["Any Lawyer"].concat(filteredLawyers.map(lawyer => lawyer.name));
      const optionsContainer = this.createOptionButtons(lawyerOptions, (selectedLawyer) => {
          this.appointment.lawyer = selectedLawyer; // Store selection temporarily
          this.addUserMessage(selectedLawyer);

          // Assign specific lawyer now if "Any" was chosen, before fetching slots
          if (selectedLawyer === "Any Lawyer") {
              const assignedLawyer = this.pickRandomLawyer(this.appointment.language); // Pass language for filtering
              this.appointment.lawyer = assignedLawyer; // Assign actual lawyer name
              this.addBotMessage(`We've assigned ${assignedLawyer} based on availability.`, 800);
               setTimeout(() => this.fetchAvailableSlots(assignedLawyer), 1000); // Fetch for assigned lawyer
          } else {
               this.fetchAvailableSlots(selectedLawyer); // Fetch for specifically chosen lawyer
          }
      });
      const backButton = this.createBackButton("Go Back", () => this.renderStep3Language());
      setTimeout(() => {
          this.appendToLastBotMessage(optionsContainer);
          this.appendToLastBotMessage(backButton);
      }, 900);
      this.saveState();
  }

  // Fetch available slots (Pass lawyer name explicitly)
  fetchAvailableSlots(lawyerName) {
      this.currentStep = 'fetching_slots';
      console.log("Fetching slots for:", lawyerName);
      this.addBotMessage(`Checking availability for ${lawyerName}...`, 800);

      fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/available-slots', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lawyer_name: lawyerName }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              this.availableSlots = data.availableSlots || {};
              console.log("Available slots received:", this.availableSlots);
              if (Object.keys(this.availableSlots).length === 0) {
                  this.addBotMessage(`Sorry, ${lawyerName} has no available slots this month. Please select a different lawyer or 'Any Lawyer'.`, 800);
                  setTimeout(() => this.renderStep3Lawyer(), 1000); // Go back to lawyer selection
              } else {
                  this.renderStep3DateTime(); // Proceed to date/time selection
              }
          } else {
              this.addBotMessage(`Error checking availability: ${data.message || 'Unknown error'}. Please try again.`, 800);
              setTimeout(() => this.renderStep3Lawyer(), 1000); // Go back
          }
           this.saveState();
      })
      .catch(error => {
          console.error('Error fetching available slots:', error);
          this.addBotMessage("Network error checking availability. Please try again.", 800);
          setTimeout(() => this.renderStep3Lawyer(), 1000); // Go back
           this.saveState();
      });
  }

   // Render Date & Time Selection (Unchanged Logic, uses this.availableSlots)
  renderStep3DateTime() { /* ... */
      this.currentStep = 'datetime_selection';
      console.log("Rendering DateTime Selection for:", this.appointment.lawyer);
      this.addBotMessage(`Available dates for ${this.appointment.lawyer} this month. Select a date to see times:`, 800);

      const datetimeContainer = document.createElement('div');
      datetimeContainer.className = 'datetime-container'; // Ensure CSS class exists

      const availableDates = Object.keys(this.availableSlots).sort();
      if(availableDates.length === 0) {
           this.addBotMessage("No dates found in the available slots data.", 500);
           setTimeout(() => this.renderStep3Lawyer(), 1000); // Go back
           return;
      }

      const dateOptionsContainer = this.createOptionButtons(availableDates, (selectedDate) => {
           this.appointment.date = selectedDate; // Store selected date

           // --- Dynamic Time Slot Rendering ---
           const allBotMessages = this.messagesContainer.querySelectorAll('.chat-bubble.bot');
           const lastBotBubble = allBotMessages[allBotMessages.length - 1];
           const messageElement = lastBotBubble?.querySelector('.chat-message');

           if (!messageElement) {
               console.error("Could not find message element to add time slots.");
               return;
           }

           // Clear previous time options/actions if they exist
           messageElement.querySelector('.time-selection-text')?.remove();
           messageElement.querySelector('.time-options-container')?.remove();
           messageElement.querySelector('.action-buttons-container')?.remove();
            // Clear selection highlight from date buttons
           dateOptionsContainer.querySelectorAll('.chat-option-button.selected').forEach(btn => btn.classList.remove('selected'));
           // Highlight the newly selected date button
            dateOptionsContainer.querySelectorAll('.chat-option-button').forEach(btn => {
                if (btn.textContent === selectedDate) btn.classList.add('selected');
            });


           // Add time selection prompt
           const timeSelectionText = document.createElement('div');
           timeSelectionText.className = 'time-selection-text';
           timeSelectionText.innerHTML = '<p style="margin-top: 10px; margin-bottom: 5px;">Available times for ' + selectedDate + ':</p>';

           // Create time options container
           const timeOptionsContainer = document.createElement('div');
           timeOptionsContainer.className = 'time-options-container chat-options'; // Reuse styles

           const times = this.availableSlots[selectedDate] || [];
           if (times.length === 0) {
               timeOptionsContainer.innerHTML = '<p>No times available for this date.</p>';
           }  else {
            times.forEach(time => {
               const timeButton = document.createElement('button');
               timeButton.className = 'chat-option-button';
               timeButton.textContent = time;
               timeButton.addEventListener('click', () => {
                    this.appointment.time = time; // Store selected time
                    // Highlight selected time button
                    timeOptionsContainer.querySelectorAll('.chat-option-button.selected').forEach(btn => btn.classList.remove('selected'));
                    timeButton.classList.add('selected');
                    // Update action buttons (enable confirm)
                    updateActionButtons(true); // Pass true to indicate time is selected
               });
               timeOptionsContainer.appendChild(timeButton);
            });
          }

             // --- Action Buttons (Confirm / Go Back) ---
             const actionButtonsContainer = document.createElement('div');
             // Add class for specific styling within datetime step
             actionButtonsContainer.className = 'action-buttons-container';

             const updateActionButtons = (isTimeSelected) => {
                 actionButtonsContainer.innerHTML = ''; // Clear previous buttons

                 // Create "Change Lawyer" button (Use back-button class for red style)
                 const backBtn = document.createElement('button');
                 backBtn.className = 'back-button'; // Use the red style class
                 backBtn.textContent = "Change Lawyer";
                 backBtn.addEventListener('click', () => this.renderStep3Lawyer());
                 // Don't set margin-right: auto; let flexbox handle spacing if needed

                 // Create wrapper for Confirm button
                 const confirmWrapper = document.createElement('div');
                 confirmWrapper.className = 'confirm-button-wrapper'; // Class for layout control

                 // Create "Confirm Date & Time" button
                 const confirmBtn = document.createElement('button');
                 // Use chat-option-button as base, add specific class
                 confirmBtn.className = 'chat-option-button confirm-button';
                 confirmBtn.textContent = "Confirm Date & Time";

                 if (isTimeSelected) {
                     // Style is handled by CSS now, just enable/disable
                     confirmBtn.disabled = false;
                     confirmBtn.addEventListener('click', () => {
                         this.addUserMessage(`${this.appointment.date} at ${this.appointment.time}`);
                         this.renderStep4(); // Proceed to confirmation
                     });
                 } else {
                     confirmBtn.disabled = true; // Disable using attribute
                 }

                 // Append buttons to containers
                 confirmWrapper.appendChild(confirmBtn);
                 actionButtonsContainer.appendChild(backBtn); // Add back button first
                 actionButtonsContainer.appendChild(confirmWrapper); // Add confirm wrapper second
             };

           // Initial rendering of action buttons (Confirm disabled)
           updateActionButtons(false);

           // Append new elements to the message
           messageElement.appendChild(timeSelectionText);
           messageElement.appendChild(timeOptionsContainer);
           messageElement.appendChild(actionButtonsContainer);
           this.scrollToBottom(); // Ensure visibility
      }); // End of date button click handler

      datetimeContainer.appendChild(dateOptionsContainer);

      setTimeout(() => {
          this.appendToLastBotMessage(datetimeContainer);
          this.scrollToBottom();
      }, 900);
      this.saveState();
  }

   // Helper function to convert time string (Unchanged)
  convertTimeTo24(timeStr) { /* ... */
      try {
           const [time, modifier] = timeStr.trim().split(" ");
           let [hours, minutes] = time.split(":");
           hours = parseInt(hours, 10);
           minutes = parseInt(minutes || "0", 10); // Handle cases like "1 PM" -> "1:00 PM"

           if (isNaN(hours) || isNaN(minutes)) return "0000"; // Invalid format

           if (modifier.toUpperCase() === "PM" && hours !== 12) {
               hours += 12;
           }
           if (modifier.toUpperCase() === "AM" && hours === 12) {
               hours = 0; // Midnight case
           }
           return `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
      } catch (e) {
           console.error("Error converting time to 24h:", timeStr, e);
           return "0000"; // Fallback
      }
  }
  // Pick a random lawyer (Added language filter)
  pickRandomLawyer(language = "Any Language") { /* ... */
      let eligibleLawyers = this.lawyers;
       if (language && language !== "Any Language") {
           eligibleLawyers = this.lawyers.filter(lawyer => lawyer.languages.includes(language));
       }
       if (eligibleLawyers.length === 0) {
           console.warn("No eligible lawyers for random pick, defaulting to all lawyers.");
           eligibleLawyers = this.lawyers; // Fallback if filter yields none
       }
       if (eligibleLawyers.length === 0) return "Default Lawyer"; // Absolute fallback

       const randomIndex = Math.floor(Math.random() * eligibleLawyers.length);
       return eligibleLawyers[randomIndex].name;
  }

  // Render Step 4: Confirmation (Unchanged Logic)
  renderStep4() { /* ... */
       this.currentStep = 'confirmation';
       console.log("Rendering Step 4: Confirmation");

       // Generate Appointment ID (ensure required fields exist)
       const datePart = this.appointment.date?.replace(/-/g, "") || "NODATE";
       const timePart = this.appointment.time ? this.convertTimeTo24(this.appointment.time) : "NOTIME";
       const lawyerPart = this.appointment.lawyer?.replace(/\s+/g, "").toUpperCase() || "NOLAWYER";
       // Add random element for uniqueness in case of same slot/lawyer
       const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
       this.appointment.id = `${datePart}-${timePart}-${lawyerPart}-${randomSuffix}`;


       this.addBotMessage("Please review your appointment details:", 800);

       setTimeout(() => {
           const summaryHTML = `
               <div class="appointment-summary">
                   <p><strong>Topic:</strong> ${this.appointment.area || 'N/A'} → ${this.appointment.sub_area || 'N/A'}</p>
                   <p><strong>Method:</strong> ${this.appointment.connection_method || 'N/A'}${this.appointment.office_location ? ` at ${this.appointment.office_location}` : ''}</p>
                   <p><strong>Language:</strong> ${this.appointment.language || 'N/A'}</p>
                   <p><strong>Lawyer:</strong> ${this.appointment.lawyer || 'N/A'}</p>
                   <p><strong>Date & Time:</strong> ${this.appointment.date || 'N/A'} at ${this.appointment.time || 'N/A'}</p>
                   <p><strong>Appointment ID:</strong> ${this.appointment.id}</p>
               </div>`;
           this.addBotMessage(summaryHTML, 500);

           setTimeout(() => {
               this.addBotMessage("Confirm this appointment or go back to change details?", 800);

               const optionsContainer = document.createElement('div');
               optionsContainer.className = 'chat-options confirmation-actions'; // Add specific class if needed

               // Use smaller buttons for modification steps
               const step1Btn = this.createBackButton("Change Topic", () => this.renderStep1());
               const step2Btn = this.createBackButton("Change Method", () => this.renderStep2());
               const step3Btn = this.createBackButton("Change Lawyer/Time", () => this.renderStep3Lawyer()); // Go back to lawyer selection if time needs change

               // Confirm button (more prominent)
               const confirmBtn = document.createElement('button');
               confirmBtn.className = 'chat-option-button confirm-button'; // Add specific class
               confirmBtn.style.backgroundColor = '#4CAF50';
               confirmBtn.style.color = 'white';
               confirmBtn.textContent = "Confirm Appointment";
               confirmBtn.addEventListener('click', () => this.confirmAppointment());


               optionsContainer.appendChild(step1Btn);
               optionsContainer.appendChild(step2Btn);
               optionsContainer.appendChild(step3Btn);
               optionsContainer.appendChild(confirmBtn); // Add confirm last

               this.appendToLastBotMessage(optionsContainer);
           }, 1400);
       }, 900);
       this.saveState();
   }

  // Confirm the appointment (Unchanged Logic)
  confirmAppointment() { /* ... */
       this.currentStep = 'confirmed_pending_name'; // New step
       console.log("Appointment details confirmed by user.");
       this.addUserMessage("Confirm Appointment");
       this.addBotMessage("Thank you! Booking details confirmed.", 800);

       // Check for client name *before* finalizing
       if (!this.appointment.clientName) {
           setTimeout(() => this.promptForClientName(), 900);
       } else {
           this.finalizeAppointment(); // Already have name
       }
       this.saveState();
   }

  // Prompt for client name (Unchanged Logic)
  promptForClientName() { /* ... */
      this.currentStep = 'client_name_prompt'; // Specific step
      console.log("Prompting for client name.");
       this.addBotMessage("Please provide your Full Name to complete the booking:", 800);

       const nameContainer = document.createElement('div');
       nameContainer.className = 'name-input-container';

       const nameInput = document.createElement('input');
       nameInput.type = 'text';
       nameInput.className = 'name-input'; // Use existing class
       nameInput.placeholder = 'Enter your full name...';
       nameContainer.appendChild(nameInput);

       const submitBtn = document.createElement('button');
       submitBtn.className = 'chat-option-button';
       submitBtn.textContent = "Submit Name";
       submitBtn.style.marginTop = '8px';
       submitBtn.addEventListener('click', () => {
           const clientName = nameInput.value.trim();
           if (!clientName || clientName.length < 2) { // Basic validation
               this.addBotMessage("Please enter your full name.", 400);
               return;
           }
           this.appointment.clientName = clientName;
           this.addUserMessage(clientName); // Show name entered
           this.finalizeAppointment(); // Proceed to finalize
       });
       nameContainer.appendChild(submitBtn);

       setTimeout(() => {
           this.appendToLastBotMessage(nameContainer);
           nameInput.focus();
       }, 900);
       this.saveState();
   }

  // Finalize the appointment (Unchanged Logic - sends data to backend)
  finalizeAppointment() { /* ... */
      this.currentStep = 'finalized';
      console.log("Finalizing appointment:", this.appointment);
      this.addBotMessage("✅ Your appointment is booked!", 800);

       setTimeout(() => {
           const summaryHTML = `
               <div class="appointment-summary confirmed">
                    <p><strong>Client:</strong> ${this.appointment.clientName || 'N/A'}</p>
                    <p><strong>Topic:</strong> ${this.appointment.area || 'N/A'} → ${this.appointment.sub_area || 'N/A'}</p>
                    <p><strong>Method:</strong> ${this.appointment.connection_method || 'N/A'}${this.appointment.office_location ? ` at ${this.appointment.office_location}` : ''}</p>
                    <p><strong>Language:</strong> ${this.appointment.language || 'N/A'}</p>
                    <p><strong>Lawyer:</strong> ${this.appointment.lawyer || 'N/A'}</p>
                    <p><strong>Date & Time:</strong> ${this.appointment.date || 'N/A'} at ${this.appointment.time || 'N/A'}</p>
                    <p><strong>Appointment ID:</strong> ${this.appointment.id}</p>
               </div>
               <p>It has been added to ${this.appointment.lawyer}'s calendar. Please note this initial consultation is unpaid.</p>
               <p>If you need to reschedule or cancel, please call us at (604) 273-7565.</p>`;
           this.addBotMessage(summaryHTML, 800);

           // Save to Sheet and Calendar
           this.saveAppointmentToSheetAndCalendar(); // Combine backend calls

           // Add payment instructions and end chat option
            setTimeout(() => {
               const paymentMessage = `
                  <p>To confirm this consultation, please complete the payment ($268 CAD tax included) via e-transfer:</p>
                  <div class="payment-instructions">
                      <p><strong>E-transfer Details:</strong></p>
                      <ul>
                          <li><strong>Recipient Email:</strong> accounting@avid-law.com</li>
                          <li><strong>Password:</strong> 123456</li>
                          <li><strong>Message/Memo:</strong> Your Full Name & Appointment ID (${this.appointment.id})</li>
                      </ul>
                      <p><strong>Important:</strong> Please also email a screenshot of the transaction to info@avid-law.com.</p>
                  </div>
                  <p>Thank you for booking with Avid Law!</p>`;
               this.addBotMessage(paymentMessage, 1200);

               setTimeout(() => {
                const endChatBtn = this.createEndChatButton("End Chat & Close");
                this.appendToLastBotMessage(endChatBtn);

                // --- ADD CODE HERE to disable past interactions ---
                console.log("Disabling interactions in previous messages...");
                if (this.messagesContainer) {
                    const allBubbles = this.messagesContainer.querySelectorAll('.chat-bubble');
                    // Loop through all bubbles except maybe the last few containing final summary/payment/end button
                    // Adjust '3' if you have more/fewer final messages you want to keep active.
                    const bubblesToDisable = Array.from(allBubbles).slice(0, -3);

                    bubblesToDisable.forEach(bubble => {
                        // Find all buttons, inputs, and textareas within the bubble
                        const interactiveElements = bubble.querySelectorAll('button, input, textarea');
                        interactiveElements.forEach(element => {
                            element.disabled = true;
                            // Optionally add a class for visual styling (e.g., faded out)
                            element.classList.add('interaction-disabled');
                        });
                    });
                    console.log(`Disabled interactions in ${bubblesToDisable.length} bubbles.`);
                }
                // --- END ADDED CODE ---

            }, 1400);

           }, 1000);
       }, 900);
       this.saveState();
       // Maybe set isInBookingFlow back to false now? Or leave it true until chat closed?
       // this.isInBookingFlow = false; // Allow conversation again after booking? Let's keep it true for now.
   }

   // Combine save operations
  saveAppointmentToSheetAndCalendar() {
       const appointmentData = {
           phone: this.appointment.phone, // 10 digits
           meetingID: this.appointment.id,
           datetime: `${this.appointment.date} at ${this.appointment.time}`,
           lawyerName: this.appointment.lawyer,
           clientName: this.appointment.clientName,
           paid: 'No', // Explicitly set
           // Add other fields needed by both APIs if any
           area: this.appointment.area,
           sub_area: this.appointment.sub_area,
           connection_method: this.appointment.connection_method,
           office_location: this.appointment.office_location,
           language: this.appointment.language,
           date: this.appointment.date, // Separate date/time for calendar API
           time: this.appointment.time
       };
       console.log("Sending appointment data to backend:", appointmentData);

       // 1. Save to Google Sheet
       fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/save-appointment', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(appointmentData),
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               console.log('Appointment saved to Google Sheet successfully.');
               // 2. Add to Calendar (only after sheet save succeeds)
               return fetch('http://avidlawbot1.us-west-2.elasticbeanstalk.com/api/add-to-calendar', { // Chaining the fetch
                   method: 'POST',
                   headers: { 'Content-Type': 'application/json' },
                   body: JSON.stringify(appointmentData), // Send same data
               });
           } else {
               console.error('Failed to save appointment to Google Sheet:', data.message);
               this.addBotMessage("⚠️ There was an issue saving the appointment record. Please contact the office to confirm.", 500);
               // Don't attempt to add to calendar if sheet save failed
               throw new Error('Sheet save failed'); // Prevent further chaining
           }
       })
       .then(response => response.json()) // Process calendar response
       .then(data => {
           if (data.success) {
               console.log('Appointment added to calendar successfully.');
               // Both saved successfully. Message already shown in finalizeAppointment.
           } else {
               console.error('Failed to add appointment to calendar:', data.message);
               // Notify user about calendar issue specifically
               this.addBotMessage("⚠️ The appointment was recorded but couldn't be automatically added to the lawyer's calendar. Please contact the office to ensure it's scheduled.", 500);
           }
       })
       .catch(error => {
           // Catch errors from either fetch call or the thrown error
           console.error('Error during save process:', error);
           if (error.message !== 'Sheet save failed') { // Avoid double messaging if sheet failed
               this.addBotMessage("⚠️ An error occurred while saving your appointment details. Please contact the office.", 500);
           }
       });
   }

   // Helper to create the end chat button
  createEndChatButton(text = "End Chat") {
      const endChatBtn = document.createElement('button');
      endChatBtn.className = 'back-button end-chat-button'; // Add specific class if needed
      endChatBtn.textContent = text;
      endChatBtn.addEventListener('click', () => {
          this.addUserMessage("End chat");
          this.addBotMessage("Thank you for choosing Avid Law! We are looking forward to meeting you! Goodbye! 👋", 800);
          this.currentStep = 'ended';
          this.isInBookingFlow = false; // Reset state
          this.inputField.disabled = true; // Disable input
          this.sendButton.disabled = true;

          // Optional: Close chat panel automatically after delay
          setTimeout(() => {
              const chatbotPanel = document.getElementById('chatbotPanel');
              const chatbotIcon = document.getElementById('chatbotIcon');
              if (chatbotPanel && chatbotIcon) {
                  chatbotPanel.style.display = 'none';
                  chatbotIcon.style.display = 'block';
                  // Optionally reset the entire instance for a clean slate next time
                  // chatbotInstance = null; // Be careful with this if relying on global instance elsewhere
              }
          }, 2500);
      });
      return endChatBtn;
  }

} // End of ChatbotConversation class

// --- Global Instance & Initialization (Unchanged) ---
let chatbotInstance = null;

// --- REMOVE 'DOMContentLoaded' listener ---
// document.addEventListener('DOMContentLoaded', function() { // <-- REMOVE THIS LINE

console.log('chatbot.js: DOM likely interactive, attempting init.'); // <-- Add log

// Find the elements provided by layout.tsx
const chatbotIcon = document.getElementById('chatbotIcon');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotContent = document.getElementById('chatbotContent'); // The container for the instance
const closeButton = document.getElementById('closeChatbot');

// --- Add Check: Ensure all essential elements exist before proceeding ---
if (!chatbotIcon || !chatbotPanel || !chatbotContent || !closeButton) {
     console.error("chatbot.js: ERROR - One or more essential UI elements (#chatbotIcon, #chatbotPanel, #chatbotContent, #closeChatbot) not found in the DOM. Aborting initialization.");
     // Optionally, hide the icon if it exists but others don't
     if (chatbotIcon) chatbotIcon.style.display = 'none';
} else {
    console.log('chatbot.js: All required UI elements found.'); // <-- Add log

    // --- Initialize Chatbot Instance ---
    // Make instance global ONLY if other parts of the script need it, otherwise keep it local
    // let chatbotInstance = null; // Use 'let' if chatbotInstance is only used here
     // Use global 'window.chatbotInstance' if saveState/restore relies on it (be cautious)
    window.chatbotInstance = null; // Explicitly declare global for clarity if needed

    try {
      // Pass the ID of the content container to the constructor
      // The constructor now finds this element itself
      window.chatbotInstance = new ChatbotConversation('chatbotContent');
      console.log('chatbot.js: ChatbotConversation instance created.'); // <-- Add log

      // --- Setup Event Listeners (Icon/Close) ---
      // Note: These might conflict if the <Script> tag re-runs on navigation
      // Consider adding checks to prevent duplicate listeners

      // Show panel on icon click
      chatbotIcon.addEventListener('click', function() {
          console.log("chatbot.js: Icon click listener fired.");
          chatbotPanel.style.display = 'flex';
          chatbotIcon.style.display = 'none';
          //window.chatbotInstance?.focusInput(); // Use optional chaining
          window.chatbotInstance?.scrollToBottom(true); // Use optional chaining
      });

      // Hide panel on close button click
      closeButton.addEventListener('click', function() {
          console.log("chatbot.js: Close button listener fired.");
          chatbotPanel.style.display = 'none';
          chatbotIcon.style.display = 'flex';
          //window.chatbotInstance?.pauseSounds(); // Use optional chaining
      });

      // --- Outside Click Listener (Modified) ---
      document.addEventListener('click', function(event) {
        // Check if panel and icon exist (safety check)
        if (!chatbotPanel || !chatbotIcon) return;

        const isPanelVisible = chatbotPanel.style.display === 'flex';

        // --- Add this check FIRST ---
        // Check the global flag set by the React component
        if (window.ignoreNextOutsideClick) {
            window.ignoreNextOutsideClick = false; // Reset the flag immediately
            console.log("chatbot.js: Ignoring this outside click (likely from button).");
            return; // Stop processing this specific click event
        }
        // --- End added check ---

        // Original logic: If panel is visible and click is outside panel/icon
        if (isPanelVisible && !chatbotPanel.contains(event.target) && event.target !== chatbotIcon && !chatbotIcon.contains(event.target)) { // Added check for icon container too
            console.log("chatbot.js: Outside click listener fired.");
            if(closeButton) closeButton.click(); // Trigger close button's logic only if button exists
        }
    });
    // Prevent clicks inside panel closing it
    chatbotPanel.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    // --- End Outside Click ---


      // Set initial visibility (Important!)
      chatbotPanel.style.display = 'none';
      chatbotIcon.style.display = 'flex'; // Use flex as per CSS
      console.log('chatbot.js: Initial visibility set (Icon visible, Panel hidden).'); // <-- Add log

    } catch (error) {
      console.error("chatbot.js: Failed to initialize ChatbotConversation:", error);
      // Hide icon if initialization fails
      chatbotIcon.style.display = 'none';
    }
}

// }); // <-- REMOVE THIS LINE
console.log('chatbot.js: Script end'); // <-- Add log