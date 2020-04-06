package dev.toppe.meemio.service

import org.springframework.stereotype.Service
import java.io.File
import javax.annotation.PostConstruct

@Service
class FileStoreService {

    val directory = File("uploads")

    @PostConstruct
    fun init() = directory.mkdirs()

    fun storeBytes(name: String, byteArray: ByteArray) = File(directory, name).writeBytes(byteArray)

    fun readBytes(name: String): ByteArray? {
        val file = File(directory, name)
        if (file.exists()) {
            return file.readBytes()
        }
        return null
    }

}