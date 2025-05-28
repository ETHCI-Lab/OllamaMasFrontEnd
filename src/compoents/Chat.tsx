import { useEffect, useRef, useState } from "react"
import type { Session } from "../interface/Session"
import type { userInfo } from "../interface/userInfo"
import { MessageCompoent } from "./MessageCompoent"
import type { messageInfo } from "./MessageCompoent"
// import { Flows } from "../enum/flows"

export type ChatInfo = {
    session: Session | undefined,
    user: userInfo | undefined,
    submit: (message: string) => Promise<void>,
    isPending: boolean
}

export const Chat: React.FunctionComponent<{ info: ChatInfo }> = ({ info: ChatInfo }) => {

    const [message, setMessage] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    // const Agents = Object.keys(Flows);
    // const [flow, setFlow] = useState<string>(Agents[0]);

    const messageList = ChatInfo.session?.message.map((message, index) => {
        //@ts-ignore
        if (Array.isArray(message.content) && (message.role == "model" || message.role == "user") && message.content.length > 0 && message.content[0].text != undefined) {
            const info: messageInfo = {
                //@ts-ignore
                message: message,
                user: ChatInfo.user
            }
            return <MessageCompoent info={info} key={index} />
        }
    })

    useEffect(() => {
        const dom = textareaRef.current;
        if (message != "") {
            if (dom) {
                dom.style.height = 'auto';
                dom.style.height = dom.scrollHeight + "px";
            }
        }else{
            if (dom) {
                dom.style.height = 'auto';
                dom.style.height = "52px";
            }
        }
    }, [message]);

    const keyUpSubmitHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key == "Enter") {
            if (event.shiftKey) {

            } else {
                submitHandler()
            }
        }
    }

    const submitHandler = async () => {
        if (message) {
            setMessage("等待Agent回應...")
            await ChatInfo.submit(message);
            setMessage("")
        }
    }

    return <div className="chat">
        <div className="wrapper">
            {/* <div className="chooseFlow">
                <div className="btn">
                    <img src="https://omg.ethci.app/images/66d72cbb0ce1e345dd729031/76a24c8c-8d15-47fe-905a-b6e4e9f73e69__clipboard_1747669767825_image.png" alt="" />
                    {flow}
                </div>
            </div> */}
            {
                ChatInfo.session?.message.length ?
                    <div className="messageList">
                        {messageList}
                    </div>
                    :
                    <p className="welcome">
                        <img src="https://omg.ethci.app/images/66d72cbb0ce1e345dd729031/76a24c8c-8d15-47fe-905a-b6e4e9f73e69__clipboard_1747669767825_image.png" alt="" />
                        {`你好, ${ChatInfo.user?.name}`}
                    </p>
            }
            <div className={`sendChat ${ChatInfo.isPending ? ' Pending' : ''}`}>
                <textarea ref={textareaRef} placeholder="傳送訊息" value={message} onChange={(e) => { setMessage(e.target.value) }} onKeyUp={keyUpSubmitHandler} disabled={ChatInfo.isPending} />
                <div className="send"><i className="bi bi-arrow-up" onClick={submitHandler}></i></div>
            </div>
        </div>
    </div>
}