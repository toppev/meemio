package dev.toppe.meemio.config

import dev.toppe.meemio.model.Media
import dev.toppe.meemio.model.User
import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer

@Configuration
class RepositoryConfiguration : RepositoryRestConfigurer {

    /**
     * Expose Ids
     */
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        config.exposeIdsFor(User::class.java)
        config.exposeIdsFor(Media::class.java)
    }
}