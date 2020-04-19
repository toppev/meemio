package dev.toppe.meemio.config

import org.apache.catalina.Context
import org.apache.tomcat.util.http.Rfc6265CookieProcessor
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer
import org.springframework.stereotype.Component

@Component
class TomcatSameSiteCookie : TomcatContextCustomizer {

    override fun customize(context: Context) {
        context.cookieProcessor = Rfc6265CookieProcessor().apply {
            setSameSiteCookies("lax")
        }
    }
}