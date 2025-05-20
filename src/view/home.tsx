import type React from "react";
import { useEffect, useRef, useState } from "react";

import type { resp } from "../interface/resp";
import { asyncGet, asyncPost } from "../utils/fetch";
import { AgentApi, SessionApi, UserApi } from "../enum/api";
import type { Session } from "../interface/Session";
import { Chat, type ChatInfo } from "../compoents/Chat";
import type { userInfo } from "../interface/userInfo";
import { useNavigate, useParams } from "react-router";
import type { QueryAgentResult } from "../interface/agentResp";
import type { ToolResponsePart, MessageData } from "genkit";

export const Home: React.FunctionComponent = () => {

    const navigate = useNavigate();
    const cache = useRef<boolean>(false)
    const [sessions, setSessions] = useState<Array<Session>>([])
    const [currentSession, setCurrentSession] = useState<Session>()
    const [isPending, setIsPending] = useState<boolean>(false)
    const [user, setUser] = useState<userInfo>()
    const choosenSid = useParams().sid

    useEffect(() => {
        /**
         * 做緩存處理, 避免多次發起請求
         */
        if (!cache.current) {
            cache.current = true;
            updateSessionList()
            syncUserInfo()
        }
    }, [])

    const updateSessionList = () => {
        asyncGet(SessionApi.findAll, true).then((res: resp<Array<Session>>) => {
            if (res.code == 200) {
                setSessions(res.body);
                if (choosenSid != undefined) {
                    res.body.forEach((session) => {
                        if (session._id == choosenSid) {
                            setCurrentSession(session);
                        }
                    })
                } else {
                    setCurrentSession(res.body[res.body.length - 1]);
                }
            }
        });
    }

    const switchSession = (session: Session) => {
        navigate(`/${session._id}`);
        setCurrentSession(session);
    }

    const syncUserInfo = async () => {
        const userInfo: resp<userInfo | undefined> = await asyncGet(UserApi.getInfo, true)
        if (userInfo.code == 200) {
            setUser(userInfo.body);
        } else {
            navigate("/login");
        }
    }

    const sessionList = sessions?.map((Session, index) => {
        return <div className={`session ${Session._id == currentSession?._id ? ' active' : ''}`} onClick={() => { switchSession(Session) }} key={index} >
            <img src="https://omg.ethci.app/images/66d72cbb0ce1e345dd729031/76a24c8c-8d15-47fe-905a-b6e4e9f73e69__clipboard_1747669767825_image.png" alt="" />
            <div className="title">
                {Session.title}
            </div>
        </div>
    })

    const newSession = async () => {
        await asyncPost(SessionApi.insertOne, {}, true);
        updateSessionList()
    }

    const submitHadler = async (message: string) => {

        setIsPending(true);

        currentSession?.message.push({
            role: "user",
            content: [{ text: message }],
            output: undefined,
            text: message,
            media: null,
            data: undefined,
            toolRequests: [],
            interrupts: [],
            toJSON: function (): MessageData {
                const temp: MessageData = {
                    role: "user",
                    content: [{ text: message }]
                }
                return temp
            },
            toolResponseParts: function (): ToolResponsePart[] {
                const temp: ToolResponsePart[] = []
                return temp;
            }
        })

        const res: QueryAgentResult = await asyncPost(AgentApi.pythonFlow, {
            "data": {
                "sid": currentSession?._id,
                "input": message
            }
        }, true)

        updateSessionList()

        setIsPending(false);
    }

    const chatInfo: ChatInfo = {
        session: currentSession,
        user: user,
        submit: submitHadler,
        isPending: isPending
    }


    return <div id="home">
        <div className="container">
            <div className="left">
                <div className="newChat" onClick={newSession}>
                    <img src="https://omg.ethci.app/images/66d72cbb0ce1e345dd729031/76a24c8c-8d15-47fe-905a-b6e4e9f73e69__clipboard_1747669767825_image.png" alt="" />
                    <p>新對話</p>
                    <i className="bi bi-pencil-square"></i>
                </div>
                <div className="sessionList">
                    <p>對話紀錄</p>
                    {sessionList}
                </div>
            </div>
            <div className="right">
                {
                    sessions.length ?
                        <Chat info={chatInfo} />
                        :
                        <div className="emptyChat">
                            <p className= "welcome">
                                <img src="https://omg.ethci.app/images/66d72cbb0ce1e345dd729031/76a24c8c-8d15-47fe-905a-b6e4e9f73e69__clipboard_1747669767825_image.png" alt="" />
                                {`你好, ${user?.name}`}
                            </p>
                            <div className="welcome start" onClick={newSession}>
                                開啟新對話 <i className="bi bi-pencil-square"></i>
                            </div>
                        </div>
                }
            </div>
        </div>
    </div>
}