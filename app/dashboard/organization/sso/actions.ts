"use server"

import { Session } from "@auth0/nextjs-auth0"

import { verifyDnsRecords } from "@/lib/domain-verification"
import { withServerActionAuth } from "@/lib/with-server-action-auth"
import crypto from "crypto"
import { revalidatePath } from "next/cache"
import slugify from "@sindresorhus/slugify"
import { managementClient } from "@/lib/auth0"
import { redirect } from 'next/navigation'

export const verifyDomain = withServerActionAuth(
  async function verifyDomain(domain: string, session: Session) {
    if (!domain || typeof domain !== "string") {
      return {
        error: "Domain is required.",
      }
    }

    try {
      const verified = await verifyDnsRecords(domain, session.user.org_id)

      return { verified }
    } catch (error) {
      console.error("failed to validate the domain", error)
      return {
        error: "Failed to validate the domain.",
      }
    }
  },
  {
    role: "admin",
  }
)

export const createSSOTicket = withServerActionAuth(

  async function createSSOTickets(session: Session) {

  try {

     const ticket =  await managementClient.selfServiceProfiles.createSsoTicket({id: 'ssp_gWrU3zgBbN559eW2xqtE35'}, {enabled_clients: ['S63jfvFTGSocru0txEVtJ2PfCXie9QCW', 'vv4F6p99xSTjxSQHtCuI5qD3Q6Det6Zv' ], enabled_organizations: [{organization_id:'org_3IkEztnr0drZup3W'}], connection_config: {name: 'atko-corp'}})
     return `${ticket.data.ticket}`
  }  catch (error) {
      console.error("failed to create the SSO connection", error)
      return {
        error: "Failed to create the SSO connection.",
      }
    }

    return{}

  },
{
  role: "admin",
}
)
