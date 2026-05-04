Generate the AI chatbot knowledge base for this client.

## MANDATORY: READ THESE FIRST
1. Read `brief.json` — all client data
2. Read `.claude/skills/industry-design-system.md` — understand the business context

## OUTPUT
Write to: `/chatbot/knowledge-base.json`

## STRUCTURE

```json
{
  "business": {
    "name": "",
    "type": "",
    "slug": "",
    "city": "",
    "address": "",
    "phone": "",
    "email": "",
    "facebook_url": "",
    "hours": {},
    "landmark": ""
  },
  
  "system_prompt": "",
  
  "services": [],
  
  "faqs": [],
  
  "conversation_flows": {
    "greeting": "",
    "pricing_inquiry": "",
    "booking_inquiry": "",
    "hours_inquiry": "",
    "location_inquiry": "",
    "complaint": "",
    "lead_capture_prompt": "",
    "fallback": ""
  },
  
  "lead_capture": {
    "enabled": true,
    "trigger_after_n_messages": 3,
    "fields": ["name", "phone", "email"],
    "api_endpoint": "https://api.yoshilabs.io/lead/{slug}"
  },
  
  "booking": {
    "enabled": false,
    "cal_url": "",
    "auto_offer_on_keywords": ["book", "schedule", "appointment", "available", "reserve"]
  }
}
```

## GENERATION RULES

### system_prompt
Write a 150-200 character system prompt that defines the chatbot's personality.
- MUST reference the business name and type
- MUST specify Filipino-friendly tone (po/opo if brief.json.chatbot.use_po_opo)
- MUST specify the chatbot's job: answer questions, capture leads, help book
- Example: "You are the AI assistant for Fresh Cuts Salon in Davao City. Be warm, friendly, and helpful. Use po/opo. Help customers with services, pricing, and booking. If unsure, direct them to call 0917-XXX-XXXX."

### services
Array of all services from brief.json.services, including name, price, duration, description.

### faqs
Generate 15-25 FAQs based on:
- Services and pricing (most asked)
- Hours and availability
- Location and directions
- Booking and walk-in policies
- Payment methods (assume: cash, GCash, Maya)
- Cancellation/rescheduling policy
- Parking availability
- Common business-type questions:
  - Salon: "Do you accept walk-ins?", "How long does hair coloring take?", "Do you have parking?"
  - Dental: "Do you accept HMO?", "Is teeth whitening safe?", "Do you have installment plans?"
  - Restaurant: "Do you deliver?", "Do you have function rooms?", "Do you cater?"
  - General: "What are your payment methods?", "Do you have parking?", "Is there Wi-Fi?"

Each FAQ must have:
- "q": natural Filipino-English question (Taglish is OK)
- "a": helpful, accurate answer using business data
- Answers should be 1-3 sentences, conversational, not robotic

### conversation_flows
Write specific response templates:

**greeting**: First message when widget opens. Warm, mentions business name.
Example: "Hi! Welcome to Fresh Cuts Salon po! I'm your AI assistant. How can I help you today? You can ask about our services, pricing, or book an appointment!"

**pricing_inquiry**: Template for when customer asks about prices. Reference services array.
**booking_inquiry**: If Pro package, direct to Cal.com. If Starter, say "I'll have them call you! Can I get your name and number?"
**hours_inquiry**: Reference hours from brief.json
**location_inquiry**: Address + landmark if available
**complaint**: Empathetic response, direct to phone call
**lead_capture_prompt**: After N messages, ask for contact info naturally
Example: "Sige po! Para ma-contact ka ng {business_name}, pwede ko makuha name at phone number mo?"

**fallback**: When AI doesn't understand
Example: "Hmm, I'm not sure about that po. Let me have {business_name} get back to you! Can I get your name and number para mac-contact ka?"

### booking
If `brief.json.package === "pro"`:
- enabled: true
- cal_url: "https://cal.yoshilabs.io/{slug}"
- auto_offer_on_keywords: keywords that trigger a booking suggestion

## QUALITY CHECK
- [ ] All services from brief.json are included
- [ ] FAQs cover the 5 most common question categories
- [ ] System prompt mentions the business by name
- [ ] Filipino tone is natural (not robotic)
- [ ] Lead capture flow is present
- [ ] Fallback directs to phone call
- [ ] No placeholder text anywhere
- [ ] Booking flow is present if Pro package
