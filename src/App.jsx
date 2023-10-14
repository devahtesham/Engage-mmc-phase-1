import './App.css'
import Layout from './components/Layout/Layout'

import { ToastContainer } from "./Toastify/Toastify"

function App() {

    return (
        <>
    
            <Layout />
            {/* displaying notification popup */}
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
        </>
    )
}

export default App
