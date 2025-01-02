import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CiCalendar } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineMessage } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";
import { useGetSMS, useSendSMS } from "@/hooks/smsHooks";
import moment from "moment";
import { formatTime } from "@/utils/tools";

interface Appointment {
  serviceName: string;
  teamMemberName: string;
  teamMemberId: string;
  start_time: string;
}

interface Message {
  text: string;
  sender: string;
  time: string;
  type: "received" | "sent" | "appointment";
  phone?: string;
  icon: boolean;
  title?: string;
  teamMemberId?: string;
  client?: string;
}

interface ChatFeatureProps {
  appoinment: {
    paymentId: {
      customerId: string;
    };
    date: string;
    bookings?: Appointment[];
    id: string;
    customerId: {
      id: string;
      name: string;
      email: string;
      telephone: String;
    };
  };
}

const ChatFeature: React.FC<ChatFeatureProps> = ({ appoinment }) => {
  console.log("appoinment ======>>>", appoinment)
  console.log("appoinment?.customerId?.id ======>>>", appoinment?.paymentId.customerId)
  
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { msg } = useGetSMS( appoinment?.paymentId?.customerId);
  const { handleSendSMS } = useSendSMS();

  const transformData = (): Message[] => {
    return msg.map((item: any) => {
      return {
        text: item.payload?.content,
        title: item.sendBy === "appointment" ? item.payload?.content : null,
        sender:
          item.sendBy == "teamMember" ? user?.name : item?.customerId?.name,
        time:
          new Date(item?.createdAt).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }) +
          " on " +
          new Date(item?.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        type:
          item?.sendBy == "teamMember"
            ? "sent"
            : item?.sendBy == "customer"
            ? "received"
            : "appointment",
        icon: true,
      };
    });
  };

  useEffect(() => {
    setMessages(transformData());
  }, [msg]);

  const [showPopup, setShowPopup] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const modalVisibleData =
    appoinment.bookings?.map((item: Appointment) => ({
      serviceName: item.serviceName,
      teamMemberName: item.teamMemberName,
      teamMemberId: item.teamMemberId,
      start_time: item.start_time,
    })) || [];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: newMessage,
          sender: user?.name,
          time:
            new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }) +
            " on " +
            new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          type: "sent",
          icon: true,
        },
      ]);

      const sendMSG = {
        senderId: user?.id,
        customerId: appoinment?.paymentId?.customerId,
        type: "text",
        payload: {
          content: newMessage,
        },
        sendBy: "teamMember",
      };
      handleSendSMS(sendMSG);
      setNewMessage("");
    }
  };

  const handleAddAppointment = (app: any) => {
    setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      {
        type: "appointment",
        title: app.serviceName,
        teamMemberId: app.teamMemberId,
        client: app.teamMemberName,
        icon: true,
      } as Message,
    ]);

    const sendMSG = {
      senderId: user?.id,
      customerId: appoinment?.paymentId.customerId,
      type: "text",
      payload: {
        content: app.serviceName,
      },
      sendBy: "appointment",
      date: appoinment?.date,
      start_time: app.start_time,
    };
    handleSendSMS(sendMSG);
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const s = chatContainerRef.current;
    if (s) {
      s.scrollTop = s.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] p-4 bg-[--brand-grey-color] relative">
      <div className="flex-1 overflow-y-auto mb-4" ref={chatContainerRef}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.type === "sent"
                  ? "justify-end"
                  : message.type === "appointment"
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              {message.type === "appointment" ? (
                <div className="mt-4 border-t pt-4 mb-7 rounded-lg">
                  <div className="bg-white border rounded-lg text-sm text-gray-700 justify-center mx-8 p-4">
                    <div className="flex items-center mb-2">
                      <div className="rounded-lg bg-gray-200 p-2 mr-3">
                        <CiCalendar size={20} color="black" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700 font-bold">
                          {message.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {message.client}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        (window.location.href = `/appointments/view/${appoinment.id}`)
                      }
                      className="mt-2 px-4 py-2 bg-gray-200 rounded w-full text-blue-700"
                    >
                      View appointment
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`max-w-xs pt-2 pb-1 pl-2 pr-5 rounded-lg ${
                    message.type === "sent"
                      ? "bg-gray-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {message.icon &&
                    //@ts-ignore
                    message.type != "appointment" && (
                      <div className="flex items-start mb-2">
                        <div className="rounded-lg bg-gray-200 p-2 mr-3">
                          <MdOutlineMessage size={20} color="black" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">
                            {message.sender}
                          </div>
                          <div className="text-xs text-gray-400">
                            {message.phone}
                          </div>
                        </div>
                      </div>
                    )}
                  <div className="text-sm">{message.text}</div>
                  <div className="mt-1 text-xs text-gray-400">
                    {message.time}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">No Message</div>
        )}
      </div>

      <div className="flex items-center">
        <div className="w-fit mr-2">
          <AiOutlinePlus
            size={24}
            className="cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
          />
        </div>
        <div className="flex-1">
          <Input
            borderline={true}
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </div>
        <div className="w-fit ml-2">
          <Button btnType="outline" loading={false} onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>

      {showPopup && (
        <div className="absolute bottom-16 left-4 bg-white border rounded-lg p-4 shadow-lg">
          <h3 className="text-lg font-bold mb-2">Select an Appointment</h3>
          <ul>
            {modalVisibleData.map((app, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                onClick={() => handleAddAppointment(app)}
              >
                {app.serviceName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatFeature;
