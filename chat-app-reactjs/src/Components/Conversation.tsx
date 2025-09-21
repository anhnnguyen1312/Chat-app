import ConversationItem from './ConversationItem';
const Conversation = () => {
  const data = [
    {
      name: 'Rey Jhon',
      time: 'just now',
      message: 'Hey there! Are you finish creating the chat app?',
      active: true,
    },
    {
      name: 'Cherry Ann',
      time: '12:00',
      message: 'Hello? Are you available tonight?',
      active: true,
    },
    {
      name: 'Lalaine',
      time: 'yesterday',
      message: "I'm thingking of resigning",
      active: false,
    },
    {
      name: 'Princess',
      time: '1 day ago',
      message: 'I found a job :)',
      active: false,
    },
    {
      name: 'Charm',
      time: '1 day ago',
      message: 'Can you me some chocolates?',
      active: false,
    },
    {
      name: 'Garen',
      time: '1 day ago',
      message: "I'm the bravest of all kind",
      active: true,
    },
  ];

  return (
    <div className="p-1">
      {data.map((item, index) => (
        <ConversationItem
          message={item.message}
          time={item.time}
          name={item.name}
          active={item.active}
          key={index}
        />
      ))}
    </div>
  );
};

export default Conversation;
