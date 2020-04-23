package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.*

@Entity
class Media(

        /**
         * Who uploaded this media
         */
        @ManyToOne
        @JoinColumn
        @JsonIgnore
        val user: User,

        /**
         * Why this media was uploaded (e.g avatar or post)
         */
        var uploadType: UploadType?,

        /**
         * When was this media uploaded
         */
        var created: Date = Date(Calendar.getInstance().time.time),

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)

enum class UploadType {
    POST,
    AVATAR
}