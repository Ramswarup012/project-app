package com.probattle.app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.getcapacitor.BridgeActivity
import android.webkit.DownloadListener

class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        try {
            this.appView?.webView?.setDownloadListener(DownloadListener { url, userAgent, contentDisposition, mimetype, contentLength ->
                try {
                    val i = Intent(Intent.ACTION_VIEW)
                    i.data = Uri.parse(url)
                    startActivity(i)
                } catch (e: Exception) {
                    // ignore or log
                }
            })
        } catch (e: Exception) {
            // ignore if webView not available yet
        }
    }
}
