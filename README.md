## React Pro Messenger

A feature-rich chat component with Telegram-inspired UI and modern messaging features.

![Chat Interface Preview](https://github.com/user-attachments/assets/1989e6b1-e6c8-4c1b-a78b-10e979b7544c) ![image](https://github.com/user-attachments/assets/43d19d72-03fb-4637-b913-fedbbd2d58a6) ![image](https://github.com/user-attachments/assets/e47668bf-bae8-4a91-acf9-4ac2432fed39)

---

## Features ✨

### Core Functionality

- Telegram-style messaging interface
- Multi-user chat support
- Message history with scroll
- Responsive design

### Message Types

- **Text messages** with formatting
- **Voice messages** with audio player
- **File attachments** (images, documents)
- **Symbol integration** (@mentions, #tasks)

### Interactive Features

- Context menu for message actions
- Delete/edit message functionality
- Dynamic symbol recognition:(for example :)
  - `@` for user mentions
  - `#` for task references
- Animated message transitions

---

## Installation 📦

```bash
npm install react-pro-messenger
```

# or

```bash
yarn add react-pro-messenger
```

## Basic Usage 🚀

```tsx
import { Chat, MessageEntity } from "react-pro-messenger";

const App = () => {
  const [messages, setMessages] = useState<MessageEntity[]>(initialMessages);
  const currentUser = { id: "user-1", fullName: "John Doe" };

  return (
    <Chat
      messages={messages}
      user={currentUser}
      onMessageSent={(newMsg) => setMessages([...messages, newMsg])}
      onDeleteMessage={(id) =>
        setMessages(messages.filter((msg) => msg.id !== id))
      }
    />
  );
};
```

## Component Props ⚙️

### Chat Component Configuration

| Prop                       | Type                 | Default      | Description               |
| -------------------------- | -------------------- | ------------ | ------------------------- |
| `messages`                 | `MessageEntity[]`    | **Required** | Array of message objects  |
| `user`                     | `UserInterface`      | **Required** | Current user details      |
| `width`                    | `string`             | `"400px"`    | Container width           |
| `height`                   | `string`             | `"600px"`    | Container height          |
| `dynamicSymbolAssignments` | `SymbolAssignment[]` | `[]`         | Symbol-component mappings |
| `className`                | `string`             | `""`         | Additional CSS classes    |

**Key**:  
📌 `Type` = Expected prop type  
📌 `Default` = Default value if not required  
📌 **Required** = Must be provided

## Customization 🎨

Symbol Integration

```tsx
const taskComponent = ({ listsProps, onClick }) => (
  <div className="task-item">
    <span>📌</span>
    <p>{listsProps.name}</p>
  </div>
);

<Chat
  dynamicSymbolAssignments={[
    {
      symbol: "#",
      component: taskComponent,
      lists: tasksList,
    },
  ]}
/>;
```

# Basic Usage 💻

```tsx
Copy;
import { Chat, MessageEntity } from "react-pro-messenger";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const currentUser = { id: "user-1", fullName: "John Doe" };

  return (
    <div className="h-[600px] w-[400px]">
      <Chat
        messages={messages}
        user={currentUser}
        onMessageSent={(newMsg) => setMessages([...messages, newMsg])}
        onDeleteMessage={(id) =>
          setMessages(messages.filter((msg) => msg.id !== id))
        }
      />
    </div>
  );
}
```

## Dynamic Symbol Integration (@/#) 🔠

```tsx
Copy;
import { Tasks, User } from "react-pro-messenger";

// In your main component
<Chat
  dynamicSymbolAssignments={[
    {
      symbol: "#",
      component: ({ listsProps, onClick }) => (
        <Tasks task={listsProps} onClick={onClick} />
      ),
      lists: yourTasksList,
    },
    {
      symbol: "@",
      component: ({ listsProps, onClick }) => (
        <User user={listsProps} onClick={onClick} />
      ),
      lists: yourUsersList,
    },
  ]}
/>;
```

## Sending Messages Example 📩

```tsx
Copy;
// Create new message
const newMessage = new MessageEntity({
  id: Date.now().toString(),
  text: "Hello World!",
  createdDate: new Date().toISOString(),
  user: currentUser,
  isRightSided: true,
});

// Add to messages array
setMessages((prev) => [...prev, newMessage]);
```

## Advanced Features 🚀

1. Custom Styling

```tsx
<Chat
  className="custom-chat-styles"
  dynamicSymbolAssignments={
    [
      /*...*/
    ]
  }
  // Add Tailwind classes or CSS modules
  style={{
    "--message-bg": "#f0f4ff",
    "--user-color": "#1a237e",
  }}
/>
```

2. Context Menu Handling

```tsx
const handleDelete = (messageId: string) => {
  setMessages(messages.filter((msg) => msg.id !== messageId));
};

const handleEdit = (messageId: string) => {
  // Your edit logic
};

<Chat onDeleteMessage={handleDelete} onEditMessage={handleEdit} />;
```

## Contributing 🤝

Fork the repository

Create feature branch:

```bash
git checkout -b feature/new-feature
```

Commit changes:

```bash
git commit -m 'Add awesome feature'
```

Push to branch:

```bash
git push origin feature/new-feature
```

Open a Pull Request

License 📜
MIT License © 2023 [mahdij98]
