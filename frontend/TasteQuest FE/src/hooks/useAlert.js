import { useData } from '../store/appStore'

export const useAlert = () => {
  const { setData } = useData()

  const addAlert = ({ key, message }) => {
    setData((prevData) => ({
      ...prevData,
      alerts: { ...prevData.alerts, [key]: message },
    }))
  }

  return { addAlert }
}
