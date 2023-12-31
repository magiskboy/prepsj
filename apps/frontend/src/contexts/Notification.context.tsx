import { PropsWithChildren, createContext } from 'react';

type NotificationContextProps = {

}

const initialValue: NotificationContextProps = {

}

export const NotificationContext = createContext(initialValue);

export function NotificationProvider({children}: PropsWithChildren) {
  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  )
}