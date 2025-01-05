import { NextPage } from 'next'

// ** Views
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}
const Register: NextPage<TProps> = () => {
  return <RegisterPage />
}

Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true
Register.authGuard = false
export default Register
