import RouterPath from "./router/route";
import './App.css'
import { ConfigProvider } from "antd";
import { theme } from "./config/theme.js"

function App() {

  return (
    <ConfigProvider theme={theme}>
      <RouterPath />  
    </ConfigProvider>
  )
}

export default App
