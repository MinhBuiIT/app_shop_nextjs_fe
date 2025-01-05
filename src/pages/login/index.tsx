import { NextPage } from 'next'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LoginPage from 'src/views/pages/login'

type TProps = {}
const Login: NextPage<TProps> = () => {
  return <LoginPage />
}

Login.getLayout = page => <BlankLayout>{page}</BlankLayout>
Login.guestGuard = true
Login.authGuard = false

export default Login
