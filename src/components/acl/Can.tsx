import { AnyAbility } from '@casl/ability'
import { createContextualCan } from '@casl/react'
import { createContext } from 'react'

// Để tái sử dụng AbilityContext, chúng ta sẽ tạo một AbilityContext từ createContext và truyền vào createContextualCan để tạo một CanContext -> cho việc ẩn hiện UI dựa trên quyền của người dùng
export const AbilityContext = createContext<AnyAbility>(undefined!)

export default createContextualCan(AbilityContext.Consumer)
