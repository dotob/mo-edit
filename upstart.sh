#!upstart                                                                                                        
description "moedit"
author      "moedit by basti"
 
env PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
 
respawn
start on runlevel [23]
stop on shutdown
 
script
    export DISPLAY=:1
    export NODE_ENV=production
    exec authbind coffee /root/mo-edit/index.coffee >> /var/log/moedit.log
end script