import client from "../config/db.js";
import { Wifi } from "@prisma/client";
export async function createWifi(wifiData : Omit<Wifi, "id" | "createdAt">) {
        const wifi = await client.wifi.create({
                data: {
                        
                        title: wifiData.title,
                        network: wifiData.network,
                        password: wifiData.password,
                        userId : wifiData.userId,
               
                },
        });
        return wifi;
}

export async function getTitle(title : string, userId : number) {
        const wifi = client.wifi.findFirst({
                where: {
                        title,
                        userId
                }
        })
        return wifi;
}

export async function findOneWifi(wifiId : number, userId : number){
        const wifi = client.wifi.findFirst({
                        where: {
                                id : wifiId,
                                userId
                        }
                })
        return wifi
}
export async function findManyWifis(userId : number){
        const wifis = client.wifi.findMany({
                where: {
                        userId
                }
        })
        return wifis
}
export async function deleteWifi(wifiId : number){
        const wifi = client.wifi.delete({
                where: {
                        id : wifiId
                }
        })
        return wifi

}