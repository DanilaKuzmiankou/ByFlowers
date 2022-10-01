import CookieConsent from 'react-cookie-consent'

export const CustomCookieConsent = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Принять"
      cookieName="Cookie Authentication"
      style={{
        background: '#2B373B',
      }}
      buttonStyle={{ color: '#4e503b', fontSize: '2rem', marginTop: '10px' }}
      expires={150}
    >
      <span style={{ fontSize: '2rem' }}>
        Этот сайт использует куки для улучшения использования сайта.
      </span>
    </CookieConsent>
  )
}
