import { Spinner } from 'flowbite-react';
import { PropsWithChildren, createContext, useState } from 'react';

type LoadingContextProps = {
    setLoading: (data: {loading: boolean, text?: string}) => void;
    loading: boolean;
}

const defaultValue: LoadingContextProps = {
  setLoading: () => {},
  loading: false,
}

export const LoadingContext = createContext<LoadingContextProps>(defaultValue);

export function LoadingProvider({children}: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState<string>();

  const contextValue: LoadingContextProps = {
    setLoading: (props) => {
      setLoading(props.loading);
      if (props.loading) {
        setLoadingText(props.text || 'Loading...');
      }
    },
    loading,
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {loading && <div className="w-full z-20 fixed top-0 min-h-screen flex justify-center items-center">
        <Spinner color="info" size="xl" aria-label={loadingText || "Loading..."} />
      </div>}
    </LoadingContext.Provider>
  )
}