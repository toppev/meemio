package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import javax.persistence.*

@Entity
class Media(

        @ManyToOne
        @JoinColumn
        @JsonIgnore
        val user: User,

        var uploadType: UploadType?,

        var created: Date = Date(Calendar.getInstance().time.time),

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)

enum class UploadType {
    POST,
    AVATAR
}