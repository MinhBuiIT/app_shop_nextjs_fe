/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

// ** Types
import { buildAbilityFor, type ACLObj, type AppAbility } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'

// ** AclContext
import { AbilityContext } from 'src/components/acl/Can'
import Error401 from 'src/pages/401'
import BlankLayout from 'src/views/layouts/BlankLayout'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

//Check quyền đầu vào các page
const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  const router = useRouter()

  const { user } = useAuth()
  let ability: AppAbility

  if (user && !ability) {
    ability = buildAbilityFor(user.role.permissions, aclAbilities.subject)
  }

  // Nếu người dùng là khách hoặc đang ở trang 500 hoặc 404 hoặc không cần xác thực
  if (guestGuard || router.pathname === '/500' || router.pathname === '/404' || !authGuard) {
    // Nếu người dùng đã đăng nhập và ability thì tạo AbilityContext cho những trang 500 và 404
    if (user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      //Nếu người dùng không đăng nhập thì không cần AbilityContext
      return <>{children}</>
    }
  }

  // Nếu người dùng đã đăng nhập và có ability và can hợp lệ thì tạo AbilityContext
  if (ability && user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <Error401 />
    </BlankLayout>
  )
}

export default AclGuard
