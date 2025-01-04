import { NextPage } from 'next'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LoginPage from 'src/views/pages/login'

type TProps = {}
const Login: NextPage<TProps> = () => {
  return <LoginPage />
}

Login.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Login
