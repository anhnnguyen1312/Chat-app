import { UIConversationItem } from '../types';
type TypeProps = {
  item: UIConversationItem;

  handleSelect: (cond: UIConversationItem) => void;
};

const ConversationItem = ({
  item,

  handleSelect,
}: TypeProps) => {
  const formatTimestamp = (ts: number): string => {
    return new Date(ts).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  return (
    <div>
      <div
        onClick={() => handleSelect(item)}
        className={
          ' bg-white conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md '
        }
      >
        <div className={'flex items-center p-2  cursor-pointer '}>
          <div className="w-7 h-7 m-1">
            <img
              className="rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="flex justify-between text-md ">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {item.participantName}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
              {item.lastMessage}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-300">
              {formatTimestamp(item.lastTimestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
