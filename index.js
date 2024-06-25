import './styles.css';

const inputMessage = document.getElementById("inputMessage");
const signButton = document.getElementById("signButton");
const outputMessage = document.getElementById('outputMessage');


signButton.addEventListener('click', handleClick);

const getWallet = () => {
  const neolineN3 = new window.NEOLineN3.Init();
  return neolineN3
};

async function handleClick() {
  
  if (typeof window.NEOLineN3 !== "undefined") {
    const wallet = getWallet();
    const message = inputMessage.value;
    if (message) {
      wallet
        .signMessage({
          message
        })  
        .then((response) => {
          console.log("签名结果:", response);
          outputMessage.textContent = `message\n${message}\n\nsignature：\n${response.data}\n\npublicKey：\n${response.publicKey}\n\nsalt：\n${response.salt}`;
        })
        .catch((error) => {
          console.error("签名失败:", error);
          alert("签名失败，请查看控制台以获取详细信息。");
        });
    } else {
      alert("请输入要签名的字符串。");
    }
  } else {
    alert("请安装Neoline插件。");
  }
}
