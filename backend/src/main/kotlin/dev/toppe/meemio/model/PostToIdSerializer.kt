package dev.toppe.meemio.model

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer


class PostToIdSerializer @JvmOverloads constructor(t: Class<List<Post>?>? = null) : StdSerializer<List<Post>>(t) {

    override fun serialize(value: List<Post>, gen: JsonGenerator, provider: SerializerProvider?) {
        println(value)
        gen.writeObject(value.map { it.id})
    }
}