import { useNavigate } from "react-router";
import { UserApi } from "../enum/api";
import type { resp } from "../interface/resp";
import { asyncPost } from "../utils/fetch";
import { useState } from "react";


export const Login: React.FunctionComponent = () => {

    const navigate = useNavigate();

    const [sid, setSid] = useState<string>();

    const submitHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            login(sid);
        }
    }

    const login = async (sid: string | undefined) => {
        if (sid) {
            const res: resp<string> = await asyncPost(UserApi.login, { sid: sid },false)
            if (res.code != 200) {
                alert(`😅登入失敗: ${res.message}`);
            } else {
                localStorage.setItem("token", res.body)

                alert('😇恭喜登入成功 開始聊天吧');

                setTimeout(() => {
                    navigate("/")
                }, 800)
            }

        }
    }

    return <div id="login">
        <div className="container">
            <input type="text" placeholder="輸入學號開始聊天 🥳" value={sid} onChange={(e) => { setSid(e.target.value) }} onKeyUp={submitHandler} />
            <i className="bi bi-send" onClick={()=>{login(sid)}}></i>
        </div>
    </div>
}