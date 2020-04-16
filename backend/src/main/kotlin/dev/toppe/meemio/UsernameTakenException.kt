package dev.toppe.meemio

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.CONFLICT)
class UsernameTakenException(message: String?) : InvalidUsernameException(message)