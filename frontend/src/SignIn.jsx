import Button from "./components/Button"
import Heading from "./components/Heading"
import InputBox from "./components/InputBox"
import Subheading from "./components/Subheading"

function SignIn() {
  return (
    <div className="h-screen flex justify-center align-center p-8 bg-slate-400">
      <div className="w-1/3 border bg-white text-3xl shadow-md rounded-3xl p-3 py-8 text-center flex flex-col justify-around">
      <div>
        <Heading label={'Sign In'}/>
        <Subheading label={'Enter your Email and Password to login.'}/>
      </div>
        <div>
          <InputBox label={'username'} type={'email'} placeholder={'Enter your Email'}/>
          <InputBox label={'password'} type={'password'} placeholder={'Enter your Password'}/>
        </div>
        <div>
        <Button label={'login'} />
        </div>
      </div>
    </div>
  )
}

export default SignIn
