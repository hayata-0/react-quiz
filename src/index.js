
import React from "react"
import ReactDOM from "react-dom"
import "./style.css"


//問題文
const Problem = (props) => {
    return <h1 className="py-2 text-xl font-bold">Q.{props.title}</h1>;
};
//選択肢
const Choice = (props) => {
    return <button className={`py-2 border rounded ${props.isSelect ? 'border-blue-400 text-blue-400': 'border-gray-400 text-gray-400'}`} onClick={props.onClick}>#{props.index + 1} {props.children}</button>;
};
//答え

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            isFinalAnswer: false,
            isCheckAnswer: false,
            selectAnswer: null,
            quizList:[{
                text: "8月5日、停電した地域はどこか？",
                choices: ["練馬区","世田谷区","新宿区","港区"],
                answer: "練馬区"
            }],
        }
    }

    

    render () {

        const quiz = this.state.quizList[this.state.stepNumber]

        const choices = quiz.choices.map((choice,index) => {
            return (
                <Choice index={index}
                 isSelect={this.state}
                 onClick={() => {
                    this.setState({
                        isFinalAnswer: true,
                        selectAnswer: choice
                    })
                }}>
                    <span>{choice}</span>
                </Choice>
            )
        })
        return (
            <div className="container mx-auto p-4">
                <Problem title={quiz.text} />
                <div className="grid grid-cols-2 gap-4">{choices}</div>
                {this.state.isFinalAnswer && <button className="w-full py-2 my-4 bg-red-500 rounded text-white font-bold" onClick={() => {
                    this.setState({
                        isFinalAnswer: false,
                        isCheckAnswer: true,
                    })
                }}>ファイナルアンサー？？</button>}
                {this.state.isCheckAnswer && <div><p className="w-full py-2 my-4 bg-green-500 rounded text-white font-bold">{quiz.answer === this.state.selectAnswer ? '正解' : '不正解'}</p>
                <button className="w-full py-2 bg-gray-500 rounded text-white font-bold" onClick={() => {
                    this.setState({
                        isFinalAnswer: false,
                        isCheckAnswer: false,
                        selectAnswer: null,
                    })
                }}>リセット</button>
                </div>}
            </div>
        )
        
    }
}
ReactDOM.render(<Quiz />,document.getElementById('root'));