import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Github, Mail, MapPin } from 'lucide-react';
import { CopyButton, panel } from '../components/ui';
import { email } from '../components/Shell';
import { person } from '../data/site';

const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const available = Boolean(service && template && publicKey);
const topics = ['Research collaboration', 'Position or opportunity', 'Talk or interview', 'Other'];
const field = 'mt-1 block w-full rounded-md border border-line bg-card px-3 py-2 text-base';

function ContactForm() {
  const [state, setState] = useState<'ready' | 'sending' | 'sent' | 'error'>('ready');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    if (new FormData(form).get('website')) return;
    setState('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.sendForm(service, template, form, { publicKey });
      form.reset();
      setState('sent');
    } catch {
      setState('error');
    }
  }
  if (!available) return <p className="text-muted">Form unavailable, please email me</p>;
  return <form onSubmit={submit} className="space-y-4">
    <label className="block text-sm">Name<input className={field} name="from_name" autoComplete="name" required maxLength={100} /></label>
    <label className="block text-sm">Email<input className={field} name="from_email" type="email" autoComplete="email" required maxLength={254} /></label>
    <label className="block text-sm">Topic<select className={field} name="topic" defaultValue="" required>
      <option value="" disabled>Choose a topic</option>{topics.map(topic => <option key={topic}>{topic}</option>)}</select></label>
    <label className="block text-sm">Message<textarea className={field} name="message" rows={6} required maxLength={5000} /></label>
    <input type="hidden" name="to_email" value={person.email} />
    <div hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="min-h-10 rounded-md bg-primary px-4 text-sm font-semibold text-on-primary disabled:opacity-75" disabled={state === 'sending'}>
      {state === 'sending' ? 'Sending…' : 'Send message'}
    </button>
    <p role="status" className="text-sm">{state === 'sent' ? 'Message sent.' : state === 'error' ? 'Message could not be sent. Please try again or email me.' : ''}</p>
  </form>;
}

export default function Contact() {
  return <div className="mx-auto grid max-w-[1120px] gap-7 md:grid-cols-2">
    <section className="space-y-4">
      <h1>Get in touch</h1>
      <p className="text-muted">I'm always happy to talk about research in NeuroAI, connectomics and reliable ML. Email is the fastest way to reach me.</p>
      <div className={panel + ' space-y-3 p-5'}>
        <a className="flex flex-wrap items-center gap-2 break-all" href={email}><Mail size={19} aria-hidden="true" />{person.email}</a>
        <CopyButton value={person.email} text="Copy email" />
      </div>
      <ul className={panel + ' divide-y divide-line px-4'}>
        {([['GitHub', person.links.github], ['Google Scholar', person.links.scholar], ['LinkedIn', person.links.linkedin], ['arXiv', person.links.arxiv]] as const).map(([name, href]) =>
          <li key={name}><a className="flex items-center gap-2 py-3" href={href}>
            {name === 'GitHub' && <Github size={17} aria-hidden="true" />}{name}<ArrowUpRight className="ml-auto" size={17} aria-hidden="true" />
          </a></li>)}
      </ul>
      <p className="flex items-center gap-2 text-muted"><MapPin size={18} aria-hidden="true" />{person.location} (CET)</p>
    </section>
    <section aria-label="Contact form" className={panel + ' self-start p-5'}><ContactForm /></section>
  </div>;
}
