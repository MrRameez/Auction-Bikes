function LoginButton({onClick, text, isLoading}) {
  return (
    
      <button
      onClick={onClick}
      disabled={isLoading}
       type="submit"
       className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:bg-blue-700"
        >
         {isLoading ? "loading.." : text}
       </button>
    
  )
}

export default LoginButton
