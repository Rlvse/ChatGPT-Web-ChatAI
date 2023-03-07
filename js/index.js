const ChatGPT = (function () {
    let sk = null,
        row = document.querySelector('.container'),
        send = document.querySelector('.send'),
        input = document.querySelector('.inputText'),
        answer = null,
        inputData,
        logIndex = 0;

    //获取数据
    const getData = function getData() {
        return new Promise((resolve,reject) => {

            let xhr = new XMLHttpRequest();
            let url = "https://xxx/Api/do"

            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            // 请求
            let data = JSON.stringify({
                "text": inputData,
		"scene": "chat"
            })
            xhr.send(data)

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let json = JSON.parse(xhr.responseText);
                    if(json.code == 200){
                        let result = String(json.data);
                        console.log("结果："+result)
                        resolve(result)
                    }else {
                        reject('请求超时啦，请重试')
                    }
                }else if (xhr.readyState===4){
                    reject('请求超时，请重试')
                }
            }
        })
    }

    const answerRunder = async function answerReunder(answerIndex) {
        
        getData().then((data)=>{

            answer = document.querySelectorAll('.answer')
    
            let index = 0;
            answer[answerIndex].innerHTML = ''
            let lre = /^[\r\n]+/ig
            data = data.replace(lre, '')
            // 创建一个定时器，每隔一段时间打印一个字符
            let timer = setInterval(function () {
                answer[answerIndex].innerHTML += data[index];
                index++;
    
                // 当打印完成时，清除定时器
                if (index >= data.length) {
                    clearInterval(timer);
                }
            },
                50); // 每隔50毫秒打印一个字符
        }).catch((data)=>{
            answer = document.querySelectorAll('.answer')
    
            let index = 0;
            answer[answerIndex].innerHTML = ''
            let lre = /^[\r\n]+/ig
            data = data.replace(lre, '')
            // 创建一个定时器，每隔一段时间打印一个字符
            let timer = setInterval(function () {
                answer[answerIndex].innerHTML += data[index];
                index++;
    
                // 当打印完成时，清除定时器
                if (index >= data.length) {
                    clearInterval(timer);
                }
            },
                50); // 每隔50毫秒打印一个字符
        })
    }
       
     
    //渲染页面
    const runder = function runder() {
        inputData = String(input.value)
        //处理数据
        inputData = parseData(inputData)

        //判断输入内容是否为空
        if (inputData != '') {
            //创建元素
            let request = document.createElement('div')
            request.className = 'request'


            let question = document.createElement('p')
            question.className = 'question'
            question.innerText = `${input.value}`



            input.value = ''
            request.appendChild(question)
            row.appendChild(request)
            request.style.height = `${question.offsetHeight}px`

            response = document.createElement('div')
            response.className = 'response'

        
            

            let answer = document.createElement('p')
            answer.className = 'answer'
            answer.innerText = '🧠飞速运转中，请稍等...'
            response.appendChild(answer)
            row.appendChild(response)
        }

    }
    //功能事件
    const hander = function hander() {
        //添加点击事件
        send.onclick = function () {
            runder()
            if (inputData != '') {
                logIndex += 1
                answerRunder(logIndex)

            }

        }
        //添加定时器判断输入框是否有内容 更改输入框颜色
        let inputTime = setInterval(() => {
            let result = parseData(input.value)
            if (result) {
                send.style.backgroundColor = '#333333';
            } else {
                send.style.backgroundColor = '#ededed'
            }
        }, 300);
    }


    //处理数据 清除文中换行符
    const parseData = function parseData(data) {
        let reN = /^[\r\n]+/ig

        let reR = /[\r\n]+$/ig

        // 正则匹配文章中的换行符
        if (data.match(reN)) {
            // 如果有换行符，则替换为空
            data = data.replaceAll(reN, "");
        }
        // 正则匹配文章中的回车符
        if (data.match(reR)) {
            // 如果有回车符，则替换为空
            data = data.replaceAll(reR, "");
        }
        return data

    }

    return {
        init() {
            hander()
        }
    }
})()

ChatGPT.init()