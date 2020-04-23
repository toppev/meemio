package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonValue
import javax.persistence.Embeddable

@Embeddable
data class Notification(
        var message: String,
        /**
         * The referenced object type (e.g user or post)
         */
        var type: NotificationActionType,
        /**
         * The id of the referenced object (e.g id of a user or post)
         */
        var refId: Long = 0,
        /**
         * Whether the user has read this notification
         */
        var hasRead: Boolean = false
)

enum class NotificationActionType {

    // DO NOT CHANGE THE ORDER!!!
    NONE,
    PROFILE,
    POST;

    @JsonValue
    fun toValue() = ordinal

}