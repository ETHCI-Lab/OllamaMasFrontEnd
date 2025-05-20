import type { Message } from "genkit"
import type { userInfo } from "../interface/userInfo"
import MarkdownRenderer from "./typography/MarkdownRenderer"
import { ErrorBoundary } from "react-error-boundary"

export type messageInfo = {
    message: Message & { time?: Date },
    user: userInfo | undefined
}

export const MessageCompoent: React.FunctionComponent<{ info: messageInfo }> = ({ info: info }) => {

    const user = (
        <div className="user">
            {
                info.user?.avatar ?
                    <img src={info.user.avatar} alt="" />
                    : <i className="bi bi-person"></i>
            }
            <p>{info.user?.name}</p>
        </div>
    )

    const agent = (
        <div className="user">
            <img src="https://omg.ethci.app/images/66d72cbb0ce1e345dd729031/76a24c8c-8d15-47fe-905a-b6e4e9f73e69__clipboard_1747669767825_image.png" alt="" />
            <p>agent</p>
        </div>
    )

    const DateFormater = (raw: string): string => {
        const date:Date = new Date(raw)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 // getMonth 回傳 0-11
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return `${year}年${month}月${day}日 ${hour}時${minute}分${second}秒`
    }

    const fall = (content: string) => {
        return (
            <p>{content}</p>
        )
    }

    return (
        (info.message.content[0]['text'] != undefined ?
            <div className="message">
                {
                    info.message.role == "user" ? user : agent
                }
                <div className="content">
                    <ErrorBoundary fallback={fall(info.message.content[0].text)}>
                        <MarkdownRenderer>
                            {info.message.content[0].text}
                        </MarkdownRenderer>
                    </ErrorBoundary>
                    {
                        info.message.time != undefined
                            ? <p className="date">{DateFormater(info.message.time)}</p>
                            : null
                    }
                </div>
            </div>
            : null
        )
    )
}