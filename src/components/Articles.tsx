"use client";

import React, { useState, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Define the structure for an article
interface Article {
  id: number;
  category: string;
  title: string;
  date: string; // Placeholder date
  author: string; // Placeholder author
  role: string; // Placeholder role
  image: string; // Placeholder image path
  preview: string; // Placeholder preview
  content: string; // Placeholder for full content
}

const allArticlesData: Article[] = [
  {
    id: 1,
    category: "Real Estate",
    title: "Understanding the Legal Consequences of Breaching a Property Purchase Contract in BC",
    date: "April 16, 2025", // Replace with actual date if known
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article1.png", // Replace with actual image path
    preview: "\"I have signed a contract to buy a house, but I regret the decision and no longer wish to proceed with the transaction. Can I get my deposit back?\" In real estate transactions, some buyers may change their minds after signing a purchase contract and removing conditions, due to changes in their own financial situation or changes in the overall market. This is particularly common when buying pre-construction properties, as the time between signing the contract and completion can be quite long, during which unexpected changes may occur. What are the consequences for the buyer in such cases? Usually, the buyer has already paid a significant deposit, and they may wonder if they can get it back.", // Replace with actual preview
    content: `"I have signed a contract to buy a house, but I regret the decision and no longer wish to proceed with the transaction. Can I get my deposit back?"

In real estate transactions, some buyers may change their minds after signing a purchase contract and removing conditions, due to changes in their own financial situation or changes in the overall market. This is particularly common when buying pre-construction properties, as the time between signing the contract and completion can be quite long, during which unexpected changes may occur. What are the consequences for the buyer in such cases? Usually, the buyer has already paid a significant deposit, and they may wonder if they can get it back.

Under common law, this situation is called a breach of contract. The party that breaches the contract is required to compensate the innocent party for any actual losses suffered. If there are no losses, there is no compensation. In many transactions, a deposit cannot simply be forfeited because it often does not correspond to actual losses. Even if the contract stipulates that the deposit will be forfeited, the court often deems this to be a penalty clause and declares it invalid. Does this mean that if the seller can relist the property at the original price and sell it, or even sell it at a higher price in a good market, without actually suffering a loss, the buyer can get the deposit back?

The case of Tang v. Zhang, 2013 BCCA 52, tells us that it is not so easy for the buyer to get the deposit back. In this case, a buyer named Zhang and a seller named Tang signed a contract to purchase a property for a total price of $2.03 million. The buyer paid a deposit of $100,000. The contract stipulated that the deposit would be absolutely forfeited on account of damages if the buyer breached the contract. When the buyer breached the contract and did not want to proceed with the transaction before completion, the seller quickly resold the property at a higher price. The British Columbia Supreme Court ruled that the buyer could get the deposit back, based on the general rule of breach of contract under common law, that there is no compensation if there is no loss. However, the seller appealed the decision to the British Columbia Court of Appeal, which overturned the Supreme Court ruling, holding that the deposit could not be refunded.

The reason for the Court of Appeal's decision is based on a decision by an English court over a hundred years ago, Howe v. Smith (1884) 27 Ch. D. 89 (C.A.). This decision held that in real estate transactions, a deposit is a form of earnest money used to bind the transaction and encourage the buyer to complete it. Once the buyer breaches the contract, the deposit cannot be refunded. The Court of Appeal held that this English decision had been adopted by Canadian courts, and therefore should be applied in this case. Therefore, the seller, Tang, even though he suffered no loss as a result of the buyer's breach and actually profited from the resale of the property, had the right to keep the deposit, making a double profit.`
  },
  {
    id: 2,
    category: "Business Law",
    title: "The High Cost of Ignoring Contractual Obligations: A Case Study in Business Litigation",
    date: "April 15, 2025", // Replace with actual date
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article2.png", // Replace with actual image path
    preview: "Mr. Mo never dreamed that because of a loan of only 250,000 yuan, he would lose the gold mine with reserves worth 160 million yuan and all mining equipment. In addition, he was sentenced to pay the other party more than 400,000 yuan in litigation costs. This is tantamount to going bankrupt! Mr. Mo inherited more than 1,200 acres of gold mining rights in BC inland from his father. The stretch of mountains, the boundless territory at a glance, is full of infinite hope. The geological prospecting report shows that the mining area can make a net profit of 750,000 yuan in half a year, and a net profit of 7 million yuan in five years.", // Replace with actual preview
    content: `Mr. Mo never dreamed that because of a loan of only 250,000 yuan, he would lose the gold mine with reserves worth 160 million yuan and all mining equipment. In addition, he was sentenced to pay the other party more than 400,000 yuan in litigation costs. This is tantamount to going bankrupt!

Mr. Mo inherited more than 1,200 acres of gold mining rights in BC inland from his father. The stretch of mountains, the boundless territory at a glance, is full of infinite hope. The geological prospecting report shows that the mining area can make a net profit of 750,000 yuan in half a year, and a net profit of 7 million yuan in five years.

In 2010, after spending more than 800,000 yuan to apply for a mining license and purchase equipment, everything was ready, and only more than 200,000 yuan was needed to add some equipment and labor to make a big splash. Mr. Mo began to raise 250,000 loans. A Mr. Du took the initiative to come to the door. Mr. Du is well-informed and powerful. Mr. Du is willing to provide loans with an annual interest rate of 12%. The two chatted happily and hit it off. Mr. Du also said that he is interested in deepening cooperation in the future, including buying part of the mining rights. Mr. Mo expresses this cautiously, sincerity, take your time.

Mr. Du acted boldly, as long as Mr. Mo said the number, he would write a check immediately. In just one month, more than 160,000 yuan was paid, which solved Mr. Mo's urgent needs time and time again. Could you ask for a better partner? When Mr. Mo asked for another 50,000 yuan to buy equipment, Mr. Du said that my lawyer said that no matter how good the relationship is, we should make a formal legal document about our business. Mr. Mo was so focused on digging out the gold as soon as possible, so he simply agreed, you can get it if you want.

Mr. Du quickly brought a set of legal documents, including loan agreement, mortgage preservation agreement and IOU. Mr. Mo comes from a business family, and he has borrowed money before, so he knows that these are routine documents in commercial loans. The lawyer wrote dozens of pages of miscellaneous words and sentences. Mr. Mo felt that he knew the basic content, and finding another lawyer to review the documents would not be the same thing. So I took a rough look, confirmed that the interest rate of the loan amount was correct, and signed it with a swipe of a pen.

After the contract was signed, Mr. Du began to ask to intervene in the operation and management of the gold mine, and the relationship between the two took a turn for the worse. Just a few months later, when Mr. Mo received a letter from Mr. Du's lawyer requesting the immediate repayment of all the loans (more than 300,000 yuan at this time) and the immediate transfer of 50% of the mining rights to Mr. Du, he couldn't help feeling angry: what? Gotta give me some time to fundraise, too? Besides, it's only 300,000 yuan, why should I have half of the mining rights? Mr. Du did not say anything else, and directly sued Mr. Mo for breach of the loan contract, demanding performance and compensation.`
  },
  {
    id: 3,
    category: "Corporate Law",
    title: "Navigating Equity Financing: Common Questions for Companies in British Columbia",
    date: "April 14, 2025", // Replace with actual date
    author: "Freja Li", // Replace with actual author
    role: "Barrister & Solicitor", // Replace with actual role
    image: "/article3.png", // Replace with actual image path
    preview: "B.C. has the highest percentage of Chinese population in Canada, and the Greater Vancouver area has attracted many Chinese immigrants to live and establish their companies due to its favorable climate. The operation and development of a company cannot be done without the support of a large amount of capital. In the initial stage of the company's development, the cost of operation and development is often high, while the profitability is low, and it is difficult for the company's own capital and income to meet the needs of the company's development. In this case, many companies choose to obtain funds in the form of financing. There are two common types of financing for companies: debt financing and equity financing, and the common types of debt financing include bank loans, corporate bonds, and shareholder loans. Although debt financing is fast and simple, it often stipulates a fixed repayment period. Once a company is unable to repay the principal and interest on time, it will face a huge debt crisis or even the risk of bankruptcy. Therefore, many companies choose the way of equity financing.", // Replace with actual preview
    content: `B.C. has the highest percentage of Chinese population in Canada, and the Greater Vancouver area has attracted many Chinese immigrants to live and establish their companies due to its favorable climate. The operation and development of a company cannot be done without the support of a large amount of capital. In the initial stage of the company's development, the cost of operation and development is often high, while the profitability is low, and it is difficult for the company's own capital and income to meet the needs of the company's development. In this case, many companies choose to obtain funds in the form of financing. There are two common types of financing for companies: debt financing and equity financing, and the common types of debt financing include bank loans, corporate bonds, and shareholder loans. Although debt financing is fast and simple, it often stipulates a fixed repayment period. Once a company is unable to repay the principal and interest on time, it will face a huge debt crisis or even the risk of bankruptcy. Therefore, many companies choose the way of equity financing.

Common Misconceptions about Equity Financing

In BC, companies are mainly governed by the Business Corporations Act and Business Corporations Regulation. However, many start-up companies often have the misconception that only listed companies are subject to securities laws (including the Securities Act, Securities Regulation and other laws and regulations). In fact, regardless of whether a company is listed or not, any company may be subject to securities laws from the time of its incorporation, as long as it issues shares, whether in the form of common shares or preferred shares, and in any other form of securities.

The B.C. securities laws include the following two basic requirements:

Any individual (including businesses and individuals) engaged in the sale or trading of securities must be registered with the B.C. Securities Commission;
Any individual (including businesses and individuals) issuing or selling new shares or new securities must file a prospectus with the B.C. Securities Commission.
Unless a company's issuance of new shares for sale qualifies for an exemption under the Securities Act, failure to comply with the above two basic requirements will be suspected of violating the Securities Act.

Prospectus Exemption Conditions

Not all companies are required to file a prospectus with the B.C. Securities Commission when raising equity. The purpose of the prospectus requirement is primarily to enable investors to obtain sufficient information about the portfolio company to minimize the risk of their investment. In some cases, if the investor knows enough about the investee company, such as the investor is the founder, actual controller, or director of the investee company, the investor does not need to rely on the prospectus to obtain the relevant information about the investee company, in which case, compelling the company to prepare and file a prospectus may affect the efficiency of the company's financing. Therefore, the B.C. Securities Act provides for exemptions from the prospectus requirement.

Common exemptions include the following:

The investor is a director, officer, employee, or beneficial owner of the portfolio company;
The investor is a family member of a director, officer, or beneficial owner of the portfolio company;
The investor is a close friend or business partner of a director, officer, or de facto controller of the portfolio company;
The investor is an existing shareholder;
The investor is a securities law qualified investor.
Qualified Investor

A company's sale of new shares to a qualified investor under the securities laws may also be exempt from the prospectus requirement. Investors who are a qualifying investor under the securities laws include:

Financial institutions;
Pension funds;
Corporations, limited partnerships, and trusts with more than $5 million in net assets;
Individuals (or with a spouse) with pre-tax financial net worth in excess of $1 million;
Individuals with pre-tax net income over $200,000 in each of the previous two years (or joint net income over $300,000 with a spouse);
Individuals (or with a spouse) with a net worth in excess of $5 million;
Other investors who are qualified under the securities laws or recognized by the BC Securities Commission.

It is important to note that under the Securities Act, if a natural person investor believes he or she qualifies as a qualified investor, he or she will need to complete Form 45-106F9 to confirm that he or she qualifies as a qualified investor and fully understands the risks of the investment.`
  },
  {
    id: 4,
    category: "Family Law",
    title: "Common Questions about Separation Agreements in British Columbia",
    date: "April 11, 2025", // Replace with actual date
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article4.png", // Replace with actual image path
    preview: "Frequently Asked Questions about Separation Agreements in BC: Q: Is a signed separation agreement the same as a divorce? A: No. If the parties are registered as married, a divorce requires a court order. There are three ways to prove the breakdown of the marriage: separation for at least one year; infidelity; and domestic violence.", // Replace with actual preview
    content: `Frequently Asked Questions about Separation Agreements in BC:

 

Q: Is a signed separation agreement the same as a divorce?

A: No. If the parties are registered as married, a divorce requires a court order. There are three ways to prove the breakdown of the marriage: separation for at least one year; infidelity; and domestic violence.

 

Q: Does one party need to move out of the common residence for the separation to take effect?

A: No, it does not. However, one party needs to notify the other party of the decision to separate and demonstrate this in their behavior.

 

Q: What use is a separation agreement to me if I am considering separation?

A: A Separation Agreement can be used to confirm in writing some of the possible points of contention before obtaining a court order. For example:

 

- Whether both parties are entitled to continue to live in the dwelling

- Whether and when the dwelling will be sold

- Where the children will live

- Custody of the children

- Whether alimony, maintenance will be paid. How much will be paid?

- Division of family property and debts

 

A separation agreement is usually quicker and cheaper than litigation. A separation agreement is also legally binding.

Q: How much does it cost for a lawyer to draft a separation agreement?

A: The cost depends on the complexity of the situation you are facing and the time it takes to draft the agreement, a rough estimate of the cost will be provided based on your specific circumstances; to save you money, try to prepare the following necessary documents before meeting with a solicitor:

 

- Tax returns

- Pay stubs

- Pay stubs, payrolls, housing and mortgage related documents

- Documents related to pensions, insurance, investments, bank savings.

- Documents relating to debts
`
  },
  {
    id: 5,
    category: "Wills & Estates",
    title: "Estate Planning Essentials: Frequently Asked Questions About Wills in British Columbia",
    date: "April 10, 2025", // Replace with actual date
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article5.png", // Replace with actual image path
    preview: "Frequently Asked Questions about Wills in BC: 1. If a person dies without a Will, how will the property in his or her name be distributed? The Wills, Estates and Succession Act (WESA) governs all legal matters relating to estates in BC. If a person dies without a Will, the law defines the deceased as an Intestate and distributes property according to default rules. The common distribution rules are as follows: If the deceased had a spouse but no children, the entire estate passes to the spouse. If the deceased had a spouse and children, $300,000 is paid to the spouse and if there is any money left over after the $300,000 is paid, the spouse receives half of what is left over and the other half is divided equally among the children. If the deceased had a spouse and children, but there are children who were not born to the spouse, then $150,000 is paid to the spouse in advance of all assets, and if $150,000 is paid to the spouse, the spouse receives half of the remaining assets if there is anything left in the estate, and the other half is divided equally among the children. If there is no spouse but there are children, the estate is divided equally among the children. If there is no spouse and no heirs, then the entire estate will go to the deceased's parents, and if the parents are no longer alive, then to the deceased's other siblings, etc.", // Replace with actual preview
    content: `Frequently Asked Questions about Wills in BC:

1. If a person dies without a Will, how will the property in his or her name be distributed?

The Wills, Estates and Succession Act (WESA) governs all legal matters relating to estates in BC.

If a person dies without a Will, the law defines the deceased as an Intestate and distributes property according to default rules.

The common distribution rules are as follows:

If the deceased had a spouse but no children, the entire estate passes to the spouse.
If the deceased had a spouse and children, $300,000 is paid to the spouse and if there is any money left over after the $300,000 is paid, the spouse receives half of what is left over and the other half is divided equally among the children.
If the deceased had a spouse and children, but there are children who were not born to the spouse, then $150,000 is paid to the spouse in advance of all assets, and if $150,000 is paid to the spouse, the spouse receives half of the remaining assets if there is anything left in the estate, and the other half is divided equally among the children.
If there is no spouse but there are children, the estate is divided equally among the children.
If there is no spouse and no heirs, then the entire estate will go to the deceased's parents, and if the parents are no longer alive, then to the deceased's other siblings, etc.
 

2. What is a trustee in a will and can I appoint my minor child as a trustee of my will?

The trustee of a will, collectively referred to as the Trustee or Executor in BC, is the person or company responsible for the administration and distribution of the estate. A trustee has a duty to act in the best interests of the deceased and the beneficiaries of his or her will. Generally, the trustee must ensure that the deceased's estate is distributed in accordance with the intent of the deceased's will.

If the deceased named A as a testamentary trustee in his or her will, then A will have all the powers of administration of the deceased's estate during his or her lifetime and will distribute his or her estate in accordance with the deceased's will. The powers include, but are not limited to, renting out the deceased's home, estimating the value of the deceased's property, selling the deceased's property, and managing companies in the deceased's name.

If A, the sole appointed trustee, is a minor at the time of the deceased's death, A's guardian can apply to act as a substitute trustee under section 134 of the BC Estates Act, and if A's guardian does not make an application, the court will appoint another suitable person to deal with the will. At a later date, when A reaches the age of 19, the Court will reinstate A's right to execute the Will and the power of the Substitute Trustee will be withdrawn.

 

3. I already have a Will. What can I do if I want to change the contents of my Will?

You can choose to sign a Codicil, but the safest way is to make a new Will and destroy the original.

Do not alter the original Will without consulting a professional solicitor as there is a high risk that the Will will be executed with ambiguity or even ruled by the court to be invalid.

 

4. If I have some assets in China and some assets in Canada, how do I make a will?

The rules for wills in China and Canada are very different, so many wills made under Chinese law are not acceptable under Canadian law. To be on the safe side, it is best to make a will in China to distribute the assets in China and another will in Canada to distribute the assets in Canada. Generally, you can have a Canadian lawyer make a will in Canada stating that the will is for Canadian assets only, and then make a will in China stating that the will is for Chinese assets only.

To avoid unnecessary ambiguities and legal risks, consult a professional probate lawyer to analyze your will's distribution wishes and legal feasibility.

`
  },
  {
    id: 6,
    category: "Family Law",
    title: "A Practical Guide to the Divorce Filing Process and Procedures in British Columbia",
    date: "April 9, 2025", // Replace with actual date
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article6.png", // Replace with actual image path
    preview: "When we mention the word “divorce”, the first thing that comes to your mind may be a friend who is disillusioned with love. Happy people are always similar, while unfortunate people have their own misfortunes. After the divorce, even if he can not talk about the soul, but the frozen property, by the other party to take away the children; was forced to share half of the house, as well as that a glimpse of the endless alimony, this usually optimistic friend can not help but more anxious frown a few points. Nowadays, with the explosion of information on the Internet, the word “divorce” is slowly losing its dramatic veil, and people are beginning to be more curious about the law behind divorce. This series will lead you to analyze divorce in Vancouver from the perspective of a professional lawyer. However, please note that this article is only intended to provide you with legal knowledge and is not intended to be a legal opinion on behalf of a lawyer. Every family's situation is not similar, so please call us if you have any questions. Characteristics of Family Litigation In recent years, due to the influence of various TV shows, when the word “litigation” is mentioned, it seems as if a lawyer in a suit appears in front of everyone's eyes, talking in a courtroom. The trial has its ups and downs, and in the end, the lawyer wins the case with his wits and cries tears of joy with his client. The losing party, on the other hand, beats his chest in remorse.", // Replace with actual preview
    content: `When we mention the word “divorce”, the first thing that comes to your mind may be a friend who is disillusioned with love. Happy people are always similar, while unfortunate people have their own misfortunes. After the divorce, even if he can not talk about the soul, but the frozen property, by the other party to take away the children; was forced to share half of the house, as well as that a glimpse of the endless alimony, this usually optimistic friend can not help but more anxious frown a few points.

 

Nowadays, with the explosion of information on the Internet, the word “divorce” is slowly losing its dramatic veil, and people are beginning to be more curious about the law behind divorce. This series will lead you to analyze divorce in Vancouver from the perspective of a professional lawyer. However, please note that this article is only intended to provide you with legal knowledge and is not intended to be a legal opinion on behalf of a lawyer. Every family's situation is not similar, so please call us if you have any questions.

 

Characteristics of Family Litigation

In recent years, due to the influence of various TV shows, when the word “litigation” is mentioned, it seems as if a lawyer in a suit appears in front of everyone's eyes, talking in a courtroom. The trial has its ups and downs, and in the end, the lawyer wins the case with his wits and cries tears of joy with his client. The losing party, on the other hand, beats his chest in remorse.

In the real legal world, it's true that many lawsuits have winners and losers, such as in a civil dispute where the tenant wins and gets to stay in the house, while the landlord wins and the tenant has to pack up and leave the house. In a criminal dispute, for example, the prosecutor will pull out all the stops to prove the defendant's guilt, and if the defendant wins, he can leave the courthouse strutting and humming a little tune. If the defendant loses, a dark, dark day in jail awaits him.

But family litigation is arguably a very unique legal system.

For one thing, in family litigation, there is less of a clear sense of feedback as to whether you win or lose, and the outcome of a lengthy lawsuit is more akin to a zero-sum game in game theory. In some cases, winning or losing the case may mean that he gets the house, or that he is not responsible for the family debt. But in many more cases, especially when children are involved, even if one party gets a result that exceeds his or her expectations, in the long run, assuming that both parties leave their assets to their children after a number of years, a lot of the assets that are left to the children are lost in the long divorce proceedings.

Additionally, the subjective determinations of the parties will be particularly important in family litigation. In a criminal proceeding, the judge will determine from an objective point of view whether or not the third party committed an assault on the defendant. However, in a family lawsuit, everyone's subjective perspective will be taken into account by the judge, and even end up directly affecting the direction of the case.

Please put yourself into the following situation.

 

It's the first day of court in your divorce lawsuit against your Korean ex-husband. You are sitting in the car on the way to the court, and the snow drifting outside the window makes it difficult for you to see the road in front of you or your future.

At 9:45 a.m., lawyers from both sides arrive at the courtroom, and your attorney takes a seat in the chair next to you, exchanging pleasantries about today's cold weather while organizing the materials for the lawsuit. Not long after, as a kind-faced grandmother walked into the courtroom, the lawyers of both sides rose and bowed, opening the formal proceedings.

Vancouver is a diverse city, where you can see friends from all over the world, with different skin colors. Even though your lawyer has emphasized to you that Canadian judges will never be racially biased or otherwise sensitive, halfway through the trial, your worst fears come to a head.

The man claimed that you were not doing your job as a mother by teaching your child, for example, you would ask him to lift his bowl up in front of him when you ate with him, and this seemed very uneducated to the man from Korea. You can't help but be dismayed after hearing this, there is nothing wrong with this type of teaching of eating in Chinese culture, is there? You turn your head to look at the judge at this point, only to see her previously kind face at this point is also frowning, looking confused.

 

 

As you can see from the case above, unlike divorce proceedings in China, Canada, due to its diverse population, each family's unique cultural background and unique subjective perspective can make the entire process more complicated, which also explains the high cost of divorce proceedings in Canada. So instead of expending a lot of energy popularizing the Chinese dinner culture to the judge, most of the marital disputes in Canada are opted to have an out-of-court settlement talks to wrap up the process.

According to the authors, if you want to better resolve legal disputes in the family, then the most important thing is to keep an overlooking view.

Keeping an elevated view allows you to put yourself in the judge's shoes, which not only gives you a clearer picture of what the parties are arguing about, but also allows you to weigh whether there are ways other than going to court that would be more efficient in resolving the dispute between the parties.

`
  },
  {
    id: 7,
    category: "Family Law",
    title: "Navigating Asset Division: Understanding Property Rights During a Divorce in BC",
    date: "April 8, 2025", // Replace with actual date
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article7.png", // Replace with actual image path
    preview: "As the saying goes, family is always there for us, and we all need the help of our family members at different stages of our lives. From the moment we set foot in the society, our parents will buy us our first house or give us the start-up capital to start our own business, regardless of the return. As time goes by, we need our children to take care of our large estates and hold our hands until the end of our lives, when we are old and gray... In Western society like Canada, there are a lot of potential legal issues involved with family members helping each other. If you help a family member out of sheer enthusiasm and disregard the potential legal consequences of the act, the story may not end as beautifully as a fairy tale. In our traditional Chinese mindset, it may even seem unsympathetic to put all the details of our dealings with a family member in writing. This is certainly understandable - for example, when I, as a mother, help my son with the down payment on his wedding house, why do I have to have legal documents or records? It was a gesture of love that I gave to my son as a mother, and I wasn't asking for anything in return. However, the law often surprises people in the most unexpected and unpleasant ways. The B.C. Family Law Act governs how property and debts are divided when spouses separate. While all the rules of division are not exhaustive, the general idea is that spouses must generally divide all of their property and debts equally upon separation, unless the court finds that the division would be grossly disproportionate. However, there are some important and common exceptions to this general rule of equalization: all personal property owned by a spouse prior to the start of the relationship, inheritances, gifts from third parties, as well as settlements of certain legal disputes and insurance proceeds, are considered to be the spouse's separate property (“excluded property”), and spouses will not be required to share this separate property with the other spouse upon separation.", // Replace with actual preview
    content: `As the saying goes, family is always there for us, and we all need the help of our family members at different stages of our lives. From the moment we set foot in the society, our parents will buy us our first house or give us the start-up capital to start our own business, regardless of the return. As time goes by, we need our children to take care of our large estates and hold our hands until the end of our lives, when we are old and gray...

 

In Western society like Canada, there are a lot of potential legal issues involved with family members helping each other. If you help a family member out of sheer enthusiasm and disregard the potential legal consequences of the act, the story may not end as beautifully as a fairy tale. In our traditional Chinese mindset, it may even seem unsympathetic to put all the details of our dealings with a family member in writing. This is certainly understandable - for example, when I, as a mother, help my son with the down payment on his wedding house, why do I have to have legal documents or records? It was a gesture of love that I gave to my son as a mother, and I wasn't asking for anything in return. However, the law often surprises people in the most unexpected and unpleasant ways.

 

The B.C. Family Law Act governs how property and debts are divided when spouses separate. While all the rules of division are not exhaustive, the general idea is that spouses must generally divide all of their property and debts equally upon separation, unless the court finds that the division would be grossly disproportionate. However, there are some important and common exceptions to this general rule of equalization: all personal property owned by a spouse prior to the start of the relationship, inheritances, gifts from third parties, as well as settlements of certain legal disputes and insurance proceeds, are considered to be the spouse's separate property (“excluded property”), and spouses will not be required to share this separate property with the other spouse upon separation.

 

Returning to the example of the mother putting a down payment on her son's house, if the children's marriage breaks down, it is likely that the issue of whether the mother's down payment is the children's separate property will be a point of contention between the spouses. Under B.C. family law, whoever claims that a piece of property is separate property has the burden of proving it, and a no-holds-barred battle often begins.

 

In the example of the matrimonial home, the woman could argue that the down payment was a joint gift from her mother to both spouses, and that the home was registered in both spouses' joint names, and therefore should not be treated as the man's separate property. Conversely, the man may not only argue that the down payment was a gift from his mother to himself and not to the couple, but may also maximize his interests by arguing that the down payment for the house was in fact a loan from my mother, which is a debt that both parties will have to assume after separation. Without the relevant legal legal documents to prove what both parties are saying, the outcome of this case will be unpredictable.

 

Let's take another example. The daughter is attending school in Canada and the parents, who are settled in China, register the property in the child's name to facilitate the child's management of the property, or give the house to the child to live in but do not transfer the beneficial ownership. In other words, the parents want their daughter to hold the property in trust for them.

 

In other words, the parents want their daughter to hold the property in trust for them, but the daughter is not the owner of the property. In this scenario, if the legal relationship between the parent and the child in relation to the house is not documented in black and white, then in the event that the daughter separates from her spouse at a later date, the problem arises again when it comes time to divide the property.

After the couple separates, the man can argue that the property was a gift from the other parent to their daughter, and any appreciation in value of the gift over the course of the relationship will be divided equally. The Land Title Act creates a presumption that the person in whose name the real estate is registered is the true owner, so in this example, the daughter would need to prove that the parents are the true owners after the separation from the man. This would be very difficult without proper legal documentation.

The hypothetical scenario in the above book is actually extremely common in reality. It is often very costly and arduous to prove that a down payment on a house is a gift from a parent to their child, rather than a joint gift to both spouses, or when a property is registered in your child's name for ease of administration, you will need to go through an extremely burdensome court process to prove that you are the true owner of the property. If a lawyer is unable to obtain an authoritative legal document that confirms the true nature of the transaction, it is often the case that you will have to spend a great deal of time and money in court. The cost of a professional legal document such as a cohabitation agreement or declaration of trust is a drop in the bucket compared to the cost of litigation. And if the lack of a professional legal document results in a loss of the case, the cost is even more staggering.

 

These unfortunate scenarios are not accidental, and by the time the legal consequences are recognized, it is often too late. If you need to transfer a large amount of property to another person, we can help you analyze the potential legal risks of such a move and some of the steps you can take to prevent them.

Please also note that the information in this article is not a substitute for legal advice. As the saying goes, 10,000 people have 10,000 Hamlets, and each case is not similar, so in order to analyze your situation and maximize the protection of your interests, if necessary, please contact our firm to schedule a consultation with a professional lawyer.
`
  },
  {
    id: 8,
    category: "Wills & Estates", // Or Family Law - adjust if needed
    title: "Spousal Inheritance Rights Explained: Why Mr. Y's Wife Was Not Entitled Under BC Law",
    date: "April 7, 2025", // Replace with actual date
    author: "Avid Law", // Replace with actual author
    role: "Legal Specialist", // Replace with actual role
    image: "/article8.png", // Replace with actual image path
    preview: "In Canada, in addition to the fact that two people in a marital relationship must be spouses, the definition of spouse in many Acts includes two people who have cohabited for a certain period of time in a marriage-like relationship. The length of time required for cohabitation varies under different Acts. After the death of Mr. Y, a wealthy man, a claim by the mother of one of Mr. Y's five children (court code name Mother 1 (M1)), who claimed to be Mr. Y's spouse, for a preferential share of his estate, was rejected by the court, which ruled that M1 was not a spouse to Mr. Y. This meant that M1 would not be able to claim a preferential share of Mr. Y's estate as Mr. Y's spouse. This meant that M1 would not be able to receive half of Mr. Y's estate first as his spouse. According to court documents, M1 claimed that she and Mr. Y were spouses, and the other original claimant (court code Mother 2, or M2), who claimed to be Mr. Y's spouse, withdrew her claim during the trial. As a result, the determination of M1's identity became the focus of this estate contest.", // Replace with actual preview
    content: `In Canada, in addition to the fact that two people in a marital relationship must be spouses, the definition of spouse in many Acts includes two people who have cohabited for a certain period of time in a marriage-like relationship. The length of time required for cohabitation varies under different Acts.

 

After the death of Mr. Y, a wealthy man, a claim by the mother of one of Mr. Y's five children (court code name Mother 1 (M1)), who claimed to be Mr. Y's spouse, for a preferential share of his estate, was rejected by the court, which ruled that M1 was not a spouse to Mr. Y. This meant that M1 would not be able to claim a preferential share of Mr. Y's estate as Mr. Y's spouse. This meant that M1 would not be able to receive half of Mr. Y's estate first as his spouse.

According to court documents, M1 claimed that she and Mr. Y were spouses, and the other original claimant (court code Mother 2, or M2), who claimed to be Mr. Y's spouse, withdrew her claim during the trial. As a result, the determination of M1's identity became the focus of this estate contest.

Mr. Y's estate was estimated to be in the range of C$7 million to C$21 million. If M1 is determined to be Mr. Y's spouse, she has the first right of division of the estate and receives half of the estate first; however, if she is not considered to be a spouse, the estate will be divided among Mr. Y's children, who have five different mothers.

So, how is “spouse” defined from a legal point of view?

Adele Sun, a senior barrister, said that in Canada, in addition to the fact that two people who are in a marriage must be spouses, in many bills, the definition of spouse also includes two people who have been cohabiting for a certain period of time in a marriage-like relationship. The length of time required for cohabitation varies under different Acts. For example, under the BC Wills, Estates and Inheritance Act, under which M1 is based, the cohabitation requirement is at least two years; under the federal Income Tax Act, it's one year; and under the BC Employment and Assistance Act, it's only three months.

Adding to the complexity is the fact that “cohabitation-like relationships” are not defined in the Act, but are determined by the courts under common law, says Barrister Sun. Therefore, in principle, whether two people who are not married are spouses or not is a case-by-case decision. In countless cases, the courts have also established a series of factors to be taken into account, notably:

The intention of the parties: whether they intend to maintain a couple-like relationship in the long or medium to long term, or whether they only intend to have a temporary relationship;

Economic integration: whether they are financially dependent or support each other, or whether they are relatively independent and manage their own affairs;

Shared residence: do the parties live together all the time, or do they each have their own home base and only live together sometimes;

Intimacy: whether normal sexual relations are maintained;

Social activities: whether they go out in pairs and present themselves as partners;

Children: whether or not there are children in common, and the status of child-rearing;

Social perception: whether friends, relatives feel that the two are long term partners or are they just dating or friends who don't even know that they have any relationship.

 

The court also made it very clear that no one factor is particularly important, but rather that all the evidence must be considered in a holistic manner.

Barrister Sun argued that in M1's case, M1 met Mr. Y as early as the spring of 2004, cohabited with Mr. Y soon after meeting him, and gave birth to Mr. Y's child in 2008, but during this period Mr. Y married and divorced other people, and fell in love with many women and had many children, which showed that Mr. Y never intended to maintain an exclusive partnership with M1.

Moreover, Mr. Y and M1 had no assets in common, and Mr. Y did not provide regular financial support to M1; Mr. Y immigrated to Canada in 2007, and M1 never came to Vancouver to live with Mr. Y until Mr. Y's murder in 2015, and Mr. Y never took her on any trips, and so on. In light of the above, the Court found that Mr. Y and M1 were not in a “marriage-like relationship”, which was reasonable and justified.

Case Review

The trial of the estate of Mr. Y, the murdered Chinese tycoon, started on November 26, 2018 and ended on December 14, 2018, in which Mother 2 (M2) suddenly withdrew from the case at the beginning of December, and was approved by the court to become a witness for the defense, and the amount of the agreement was not disclosed.

In their closing arguments, lawyers representing each of the five children cited different definitions of marriage and spouse under Canadian and Chinese law to argue that the only original complainant in the case, Mother M1, was not married to Mr. Y. M1's lawyers refuted this.

On May 2, 2015, Mr. Y, a Chinese Canadian tycoon, was murdered and mutilated in his $5 million mansion in West Vancouver, British Columbia. The suspect involved was Z, then a 54-year-old Chinese man, who was allegedly the deceased's cousin's husband.

Mr. Y had a number of children but was single during his lifetime.

After Mr. Y's death, a number of women appeared claiming to be Mr. Y's “wife”. At least seven women claimed to have given birth to Mr. Y, and more than a hundred others claimed to have had a “relationship” with Mr. Y, all of whom wanted a share of the multi-million dollar estate.

According to court documents, Mr. Y married a Canadian woman in September 2005, and in 2007 he obtained permanent resident status in Canada. However, Mr. Y divorced the Canadian woman in August of the same year, after obtaining permanent resident status. Accordingly, the court found that Mr. Y had married under false pretenses for the purpose of immigration.

Prior to his death, Mr. Y was living in West Vancouver with the family of the suspected murderer, Z, which also included Z's wife, daughter, and mother-in-law, and Mr. Y was acquainted with all five mothers in this case in China. All of them continue to live in China except M2, whose children moved in with Mr. Y shortly before his death.

To be considered Mr. Y's spouse under the BC Wills and Estate Succession Act, M1 had to be in a “marriage-like relationship” with Mr. Y for the last two years before his death. To be considered Mr Y's spouse, M1 had to satisfy herself that she had lived with Mr Y in a “marriage-like relationship” for the last two years before his death.

The judge found that there was no marriage-like relationship between M1 and Mr. Y after at least 2011. Even if a marriage had existed, Mr. Y had ended their relationship when he cancelled M1's trip to Canada in 2014.

The judge said this was not a contest between M1 and the other mothers, but the testimony of the other mothers was critical to determining M1's relationship with Mr. Y. First, the evidence that the other mothers were with Mr. Y affected M1's credibility. Secondly, it also showed Mr. Y's attitude towards M1.

The document also states that from November 2013 until Mr. Y's death, Mr. Y was in relationships with several other mothers. In addition, he posted courtship messages on dating websites and traveled with other women to places such as Las Vegas in the United States and the United Kingdom during this period.

Mr. Y had also paid for rent for mothers M2 and M3 and had persuaded mothers M2 and M3 to relocate to Canada, where M2 and the children eventually moved in July 2014, and the judge found that it was likely that M2 and the children had moved to Canada because of the relationship between M2 and M3, and that Mr. Y's relationship with M2 and M3 had not been a successful one. The judge found that it was likely that it was because of M2's move to Canada that Mr. Y cancelled M1 and the children's trip to Canada.

The judge said M1's evidence in support of her role as Mr. Y's wife was simply the alleged living together, spending New Year's with her family, caring for Mr. Y's father in hospital and Mr. Y's relationship with the children. According to M1, she lived at Mr. Y's parents' home from 2007 to 2011 and went back to stay there when Mr. Y was not traveling. However, the judge said that in reality, Mr. Y lived in an apartment in a major Chinese city from 2007 onwards, and although M1 claimed that she often stayed there as well, this contradicted the times mentioned in the confessions of several other mothers.

In this case, the judge found that sexual relations were one of the important factors for the court to consider, and that M1 could not prove that she had sex with Mr. Y in the two years prior to his death, but that both mothers M2 and M3 could provide proof.

The court also found that Court's testimony lacked detail and that he knew little about Mr. Y and had little contact with him before his death. The judge therefore found that M1 and Mr. Y had not lived together since M1 moved into the apartment provided by Yuan in 2011, and that M1 had not seen Mr. Y in the eight months leading up to his death in September 2014, when Mr. Y left China for the last time.

Mr. Y also had no desire to live a similar married life with M1, and the fact that he arranged for M2 to come to Canada is evidence of the denial of his desire to live a long-term married life with M1.

Counsel for each of Mr. Y's four other children also gave evidence that Mr. Y never had any regard for M1 and stated that Mr. Y and M1 also rarely attended social events together as a couple, that only family members approved of their relationship, and that Mr. Y did not participate in the children's school activities even though the children asked their father to do so. Mr. Y also did not provide living expenses for M1, who received her money mainly from Mr. Y's mother and from M1's own mother and family.

In addition, Mr. Y and M1 did not have a joint bank account or joint property in their names, and the house in which M1 lived was in fact provided by Yuan and was in the name of Child #1. While Mr. Y had purchased expensive gifts for M1, he had also purchased gifts for other mothers and taken them on trips, but he had never taken M1 on a trip. The judge therefore found that the relationship between M1 and Mr. Y was not marriage-like and ruled against M1.
`
  },
  {
    id: 9,
    category: "Civil Litigation", // Or Family Law - adjust if needed
    title: "Enforcing your Judgment against People Pretending to have No Money has gotten Easier",
    date: "April 7, 2025", // Replace with actual date
    author: "Abiel Kwok", // Replace with actual author
    role: "Barrister & Solicitor", // Replace with actual role
    image: "/article9.png", // Replace with actual image path
    preview: "What happens when the defendants decide to quickly liquidate all their assets and now say they have no money to pay for any damages?", // Replace with actual preview
    content: `For plaintiffs, getting a winning judgment is the happy ending to a long and arduous legal process. It is vindication of your pleadings and assurance that you are entitled to compensation for your loss. So what happens when the defendants decide to quickly liquidate all their assets and now say they have no money to pay for any damages?

Background
In October 2022, Hong Fang Wu was awarded by the BC Supreme Court over $1.2 million in damages after lending money to Zhiyong Ma and his company Superoptionforex Consulting Inc. for investment. Mr. Ma, who did not tell Ms. Wu that he was not licensed to sell or trade securities at all, invested almost all of Ms. Wu’s money into one company which went bankrupt.

Mr. Ma took swift action almost immediately after the judgment. Mr. Ma and his wife of 32 years, Ying Wang, quickly filed for divorce. Ms. Wang claimed an unequal division of family property which Mr. Ma did not oppose. They also sold their family property of 22 years before the judgment could be registered against their property. In addition, the couple drew down their joint line of credit to its limit and withdrew hundreds of thousands of dollars from their joint and individual bank accounts.

In December 2022, Ms. Wu commenced a second action against Mr. Ma, Ms. Wang, and others in response to the couple’s divorce and sale of the family property. Ms. Wu alleged that the divorce and sale of the family property was actually conspired to avoid paying Ms. Wu by hiding the money via fraudulent sales and transactions. Two days later, Ms. Wu successfully applied for a Mareva injunction which froze the couple’s assets until a judgment could be made.

It later turned out that the family property was disposed of legitimately. Ms. Wu then shifted her claim towards the couple’s drawn down line of credit and withdrawal of their respective bank accounts. A few months later, Mr. Ma and Ms. Wang individually applied for the Mareva injunction to be set aside. And in August 2023, the judge who initially granted the Mareva injunction set it aside. Ms. Wu then appealed that decision to the BC Court of Appeal.

What is a Mareva injunction?
A Mareva injunction is a useful tool that prevents defendants from disposing or removing their assets when doing so may jeopardize your ability to enforce and collect on a potential judgment. Since it is difficult to prove whether a defendant has the necessary cash to pay for a judgment, the usual solution is to find another asset they own, commonly real estate, and register a charge against that property. That way, the defendant will either have to pay the damages outright to discharge the encumbrance against the asset or sell the asset and pay using the proceeds. As a result, some defendants may conspire to quickly liquidate their assets so that they appear penniless and unable to pay the damages. Thus, a Mareva injunction can be used to prevent that from happening.

Because of the severe impacts a Mareva injunction make against the defendant, the courts will determine whether granting a Mareva injunction is just and equitable in all the circumstances of the case. In BC, the courts have set the following two-part test:

The applicant has a strong prima facie case on the merits that the defendant is liquidating the assets in response to a potential judgment. It doesn’t necessarily mean that the applicant is bound to succeed, but the applicant’s case needs to be stronger than merely “arguable”. The applicant also must establish that the defendant has enough assets to pay for a potential judgment.
When balancing the interest of both the plaintiff and defendant, a just and convenience result favours granting a Mareva injunction. Relevant factors that are considered include:
the existence of the defendant’s assets inside or outside of BC;
a real risk of the disposal or dissipation of assets rendering a judgment nugatory (or useless);
evidence of irreparable harm;
the strength of the plaintiff's case;
the nature and inherent risks of the transaction giving rise to the action;
the amount of the claim; and
the history of the defendant’s conduct.
When applying for a Mareva injunction, the burden falls on the applicant to satisfy this test. Nevertheless, the test is not a hard-line test, and the courts have the flexibility to issue of a Mareva injunction at its discretion.

A new wrinkle when issuing a Mareva injunction
In this case, the Supreme Court did find that Ms. Wu had a strong prima facie case against Mr. Ma. However, since most of the Mr. Ma’s bank accounts were withdrawn and there was no evidence of where the money went, there were no assets to be restrained by a Mareva injunction.

The Court of Appeal agreed that it is “antithetical to the core purpose” of a Mareva injunction to utilize it against a defendant who has no assets. The Court also agreed that there was no evidence of where the money went. Ms. Wu did everything she could to establish that Mr. Ma dissipated all his bank accounts, and there is no reasonable way for Ms. Wu to prove where the money went. The only person who could provide evidence on where the money went was Mr. Ma.

Earlier, in the Supreme Court, Mr. Ma did not submit much useful or credible evidence—something the court found suspicious. When Mr. Ma was questioned on where the money went, his answers were vague and questionable. For example, Mr. Ma claimed that he withdrew money to pay back other creditors, but he couldn’t identify the creditors nor the amounts owing; there were also no documents to verify his claims.

The lack of credible evidence allowed the Court of Appeal to make an adverse inference that there was a real risk that Mr. Ma was liquidating his assets to avoid paying the court order. Thus, the balance favoured granting a Mareva injunction. The Court of Appeal allowed the appeal and restored the initial Mareva injunction order.

Key takeaways
This case serves as a big assist for plaintiffs who are stuck when sophisticated and/or savvy defendants liquidate their assets before the judgment is enforced. Having a strong prima facie case, demonstrating that you have done everything in your power to trace the flow of money, along with a lack of good evidence from the other side, may now be sufficient to grant a Mareva injunction and keep at least some form of security that you can collect on your judgment.

On the other hand, if you are a respondent caught in a Mareva injunction application or applying to set aside a Mareva order, trying to liquidate all your assets and then refusing to provide evidence on where the money went may backfire on you. Although it is up to the applicant to satisfy the Mareva injunction test, once a strong prima facie case has been established, the court will consider how much evidence you have provided to support your case. If your evidence is lacking and/or skeptical, and the applicant has done everything in their power to trace the flow of money, the courts may make an adverse inference that there is a real risk you are avoiding paying for a potential judgment. Thus, it is essential that you have sufficient documentation and evidence to tip the balance back in your favour and argue that an adverse inference is not applicable or warranted.

Case
Wu v. Ma, 2024 BCCA 196 (https://www.canlii.org/en/bc/bcca/doc/2024/2024bcca196/2024bcca196.html)
    `
  },
  {
    id: 10,
    category: "Family Law", // Or Family Law - adjust if needed
    title: "New Partners/Spouses Beware! Cohabitation Agreements Can Only Protect You So Far",
    date: "April 6, 2025", // Replace with actual date
    author: "Abiel Kwok", // Replace with actual author
    role: "Barrister & Solicitor", // Replace with actual role
    image: "/article10.png", // Replace with actual image path
    preview: "The start of a new romantic relationship is always a happy occasion. Most couples start without worrying much about what happens if the relationship ends. Others who may be more cautious or savvy may opt to enter into cohabitation or pre-nuptial agreements to protect their assets and property. However, these agreements are not as bulletproof as people likely want them to be. And some people have learned that lesson the hard way in court.", // Replace with actual preview
    content:
    `The start of a new romantic relationship is always a happy occasion. Most couples start without worrying much about what happens if the relationship ends. Others who may be more cautious or savvy may opt to enter into cohabitation or pre-nuptial agreements to protect their assets and property. However, these agreements are not as bulletproof as people likely want them to be. And some people have learned that lesson the hard way in court.

Background and Timeline背景和时间线
Peter and Kathy began a marriage-like relationship in January 2017 and married in October 2020. Both were in their late fifties/early sixties at the time, were previously divorced, and had their own adult children from previous marriages. Kathy was a lab technician, and Peter worked on jobs relating to the design of boats and designing or renovating homes.

彼得和凯西于 2017 年 1 月开始了同居关系，并于 2020 年 10 月结婚。当时两人分别五十多岁和六十岁出头，之前离过婚，并在之前的婚姻中育有自己的成年子女。凯西是一名实验室技术员，彼得从事与船舶设计以及房屋设计或翻新相关的工作。

In the fall of 2018, Kathy approached Peter about signing a cohabitation agreement. Kathy wanted to protect the assets she acquired prior to their relationship including the Vancouver home that they were both living in mortgage-free. Peter, on the other hand, only had a boat, a truck, some work tools, and debt. Peter agreed. He had no desire for any of Kathy’s assets anyway.

2018 年秋天，凯西找到彼得，商量签署同居协议。凯西想保护她在他们交往前获得的资产，包括他们俩居住的无贷款的温哥华的房子。另一方面，彼得只有一艘船、一辆卡车、一些工作工具和债务。彼得同意了。反正他也不想要凯西的任何资产。

The cohabitation agreement contained the following:

同居协议内容如下：

Peter and Kathy’s assets would remain separate and continue to be separately owned in the event of a separation or on death,
Peter 和 Kathy 的资产将保持独立，即使分居或死亡，他们的资产仍将由各自拥有

Any increase in value of their respective assets and any assets later acquired using their respective assets are also considered separate assets,
各自资产的任何增值以及后来用各自资产购买的资产也视为各自的资产

If they wished to co-own any assets, they must: (1) register the property in joint names; or (2) record in writing that they co-own the property,
如果他们希望共同拥有任何资产，他们必须：（1）以联名登记该财产；或（2）以书面形式记录他们共同拥有该财产，

Co-owned property is considered co-owned in proportion to the direct monetary contributions made by each of them as opposed to indirect contributions such as labour, and
双方按各自直接投资比例拥有共同财产，而不是按非直接投资，如付出的劳动等间接贡献比例共同拥有，并且

The cohabitation agreement continues to apply regardless of any material changes in circumstances including if the parties get married.
无论情况发生什么重大变化，包括双方结婚，同居协议仍然适用

The cohabitation agreement also had a clause which acknowledged that the agreement may be set aside in the event of court intervention.

同居协议中还有一条条款，承认法院有权下令将同居协议作废。

In 2019, Peter and Kathy dreamed about building a home for themselves during their retirement years. They purchased a plot of land to build their dream home for $260,000 in Naramata, BC, a small unincorporated community about an hour drive south of Kelowna. Peter was eligible for the first-time home buyer’s plan (“HBP”), so Kathy asked him to contribute $5,000 of his savings to a registered retirement savings plan (“RRSP”) in his name to be used for the HBP. Kathy also added $30,000 to the RRSP giving them $35,000 to be used for the HBP. The balance was financed by a mortgage registered against Kathy’s Vancouver home. The dream home was registered in Kathy’s name.

2019 年，彼得 和凯西 梦想着为自己建造一所退休后居住的房子。他们以 260,000 加币在卑诗省Naramata购买了一块土地，建造了他们的梦想之家。Naramata是一个小型非建制社区，在Kelowna以南约一小时车程。彼得 有资格参加首次购房者计划（“HBP”），因此 Kathy 要求他将他存下来的 5,000 加币存入以他名义注册的退休储蓄计划（“RRSP”），用于 HBP。凯西 也向 RRSP 存入了 30,000加币，这样他们就有 35,000 加币用于 HBP。余额用以 凯西 的温哥华房屋为抵押获得的贷款支付。梦想之家登记在 凯西的名下。

Construction of the dream home was largely self-handled. Peter designed the home and worked on the construction site most days while living in a trailer on site. Kathy worked in the Lower Mainland on weekdays but remained very much involved.

梦想之家的建造基本都是自己完成的。彼得设计了这座房子，大部分时间都住在施工现场的拖车里，在施工现场工作。凯西平日在低陆平原工作，但也积极参与了房子的建造。

They set up a company called Sarabande to pay for constructions expenses. Kathy was the sole director and shareholder of Sarabande as Peter’s bankruptcy hindered Sarabande’s ability to open a corporate bank account.

他们成立了一家名为 Sarabande 的公司来支付建筑费用。彼得 因为破产会妨碍 Sarabande 开设公司银行账户，所以Kathy 是 Sarabande 的唯一董事和股东。

Contribution of funds into the Sarabande account were not equal. Peter would deposit his earnings from other construction projects he was working on for other clients. Kathy also contributed her own funds and obtained a construction loan for $445,000 secured against her Vancouver home—all of which was deposited into Sarabande’s account.

双方存入 Sarabande 账户的资金并不均等。彼得 会将他为其他客户从事建筑项目的收入存入账户。凯西 也贡献了自己的资金，并以她在温哥华的房子为抵押获得了一笔 445,000加币的建筑贷款——所有资金都存入了 Sarabande 的账户。

In the summer of 2020, Peter was struck in a car accident and sustained significant injuries. Despite this, Peter resumed working on the dream home a few days later. His accident caused Kathy’s mental illness to decline rapidly, and she took disability leave with reduced pay as a result. She ended up retiring without ever returning to work. Instead, Peter and Kathy dedicated their full time to finishing the dream home.

2020 年夏天，彼得遭遇车祸，身受重伤。尽管如此，几天后彼得仍继续建造梦想之家。他的事故导致凯西的精神疾病迅速恶化，她因此休了减薪病假。她最终退休了，再也没有回去工作。相反，彼得和凯西全身心投入到完成梦想之家的建造中。

Construction of the dream home ran significantly over budget. Most of the balance was covered by Kathy who cashed out investments she owned before the relationship and borrowed additional loans and lines of credits from lenders and siblings.

建造梦想之家的费用大大超出了预算。大部分余额由凯西承担，她套现了这段关系之前的的投资，并从贷方和兄弟姐妹那里借了额外的贷款和信用借款。

The dream home was finally finished in December 2021. Around that time, Kathy told Peter that she wanted to leave the dream home to her daughter in her will, shocking Peter and straining their relationship. They separated around May 2022. Peter moved out of the dream home in April 2022, and Kathy remained while renting out a portion as an Airbnb. The Airbnb proceeds were used to pay for property taxes, home insurance, and the various mortgages and loans used for the dream home. Kathy later moved back to her Vancouver home with her son.

梦想之家终于在 2021 年 12 月完工。大约在那个时候，凯西告诉彼得，她想在遗嘱中把梦想之家留给女儿，这让彼得大吃一惊，也使他们的关系变得紧张。他们于 2022 年 5 月左右分居。彼得于 2022 年 4 月搬出了梦想之家，凯西留了下来，并将一部分作为 Airbnb 出租。Airbnb 的收益用于支付地税、房屋保险以及梦想之家的各种贷款和借款。凯西后来带着儿子搬回了温哥华的家。

Peter commenced divorce proceedings and sought for unequal division of the dream home. Kathy claimed that the dream home was entirely her property based on the terms of the cohabitation agreement. The dream home was solely registered in Kathy’s name and under the cohabitation agreement, ownership of property is determined primarily by monetary contribution and not labour.

彼得提起离婚诉讼，要求不平等分割梦想之家。凯西声称，根据同居协议的条款，梦想之家完全属于她。梦想之家登记在凯西一人名下，根据同居协议，财产所有权主要依据财务投资而不是付出的劳动决定。

The Court’s Analysis法庭的分析
The case Nicol v. Lau, 2024 BCSC 1866, in part determined whether the cohabitation agreement should be upheld or set aside. Sections 93(3) and 164(3) of the Family Law Act provide a property agreement may be set aside or replaced in whole or in part if the agreement is “procedurally unfair”—namely if one or more of the following circumstances existed when the parties entered into the agreement:

Nicol v. Lau, 2024 BCSC 1866 一案在一定程度上决定了同居协议是否应予维持或撤销。《家庭法》第 93(3) 条和第 164(3) 条规定，如果协议“程序上不公平”，即当事双方在签订协议时存在以下一种或多种情况，则可以撤销或全部或部分更改：

a spouse failed to disclose significant property or debts, or other information relevant to the negotiation of the agreement;
配偶未能披露重大财产或债务，或与协议谈判相关的其他信息；

a spouse took improper advantage of the other spouse's vulnerability, including the other spouse's ignorance, need or distress;
配偶一方不正当地利用了另一方的弱点，包括另一方的无知、需要或窘境；

a spouse did not understand the nature or consequences of the agreement; or
配偶一方不了解该协议的性质或后果；或

other circumstances that would, under the common law, cause all or part of a contract to be voidable.
根据普通法，存在其他导致合同全部或者部分可撤销的情况。

The judge found that the cohabitation agreement was procedurally fair. The agreement contained a schedule listing all of Peter and Kathy’s assets. There was no evidence that Kathy hid her full financial picture or pressured Peter into signing the agreement. Peter also received independent legal advice before signing.

法官认为，同居协议在程序上是公平的。协议中包含一份清单，列出了彼得和凯西的所有资产。没有证据表明凯西隐瞒了她的全部财务状况或迫使彼得签署协议。彼得在签署前也获得了独立的法律建议。

The judge then had to determine whether the agreement in substance is “significantly” unfair. The term “significant” is defined in Remmem v. Remmem, 2014 BCSC 1552, as something “weighty, meaningful or compelling” that is “extensive or important enough to merit attention” Section 93(5) sets out factors to consider:

然后，法官必须确定协议的实质内容是否“严重”不公平。“严重”一词在 Remmem v. Remmem, 2014 BCSC 1552 案中定义为“重要、有意义或令人信服”的情况，即“广泛或重要到值得关注的情况”。第 93(5) 条列出了需要考虑的因素：

the length of time that has passed since the agreement was made;
自达成协议以来已过去的时间长度

the intention of the spouses, in making the agreement, to achieve certainty;
配偶双方订立协议时的意图是否是保证确定性

the degree to which the spouses relied on the terms of the agreement.
配偶双方对协议条款的依赖程度

This step tipped the balance in Peter’s favour. Though there was little time that passed since the cohabitation agreement was made, the judge held that the construction of the dream home, plus all the steps that were taken to finish construction, were changes that were too significant to have been contemplated when devising the cohabitation agreement.

这一点上彼得占了上风。虽然同居协议签署的时间并不长，但法官认为，梦想之家的建造，以及为完成建造而采取的所有步骤，都是重大变化，在签署同居协议时必须考虑到。

Kathy’s claim to the dream home relied significantly on the facts that she shouldered most of the financial burden of construction, most of the property at issue was under Kathy’s name, and the cohabitation agreement had specific guidelines as to the steps needed designate property as jointly owned. However, other circumstances, including Peter and Kathy’s consistent representations to each other and other people that the dream home was their property and Peter’s extensive dedication to constructing the dream home from start to finish, were too much for the judge to disregard. If either was truly concerned about how ownership of the dream home would be decided under the cohabitation agreement, they should have had such discussions earlier. However, they did not have any formal discussion about ownership until after the dream home was constructed in December 2021.

凯西对梦想之家的所有权主要基于以下事实：她承担了大部分建设资金，大部分有争议的财产都在凯西名下，同居协议对指定财产为共同财产所需步骤有具体说明。然而，其他情况，包括彼得和凯西一直向对方和其他人表示梦想之家是他们的财产，以及彼得从始至终为建造梦想之家付出的巨大努力，都是法庭无法忽视的因素。如果他们真的关心根据同居协议如何决定梦想之家的所有权，他们应该早点讨论这一点。然而，直到 2021 年 12 月梦想之家建成后，他们才正式讨论所有权问题。

Thus, the judge found that neither Peter nor Kathy relied on the cohabitation agreement to determine ownership of the dream home. This led the judge to rule that the cohabitation agreement should be aside when determining the ownership of the dream home and that the dream home ought to be considered family property to be divided.

因此，法官认为 Peter 和 凯西都没有依赖同居协议来确定梦想之家的所有权。因此，法官裁定，在确定梦想之家的所有权时，同居协议不予考虑，梦想之家应被视为需要分割的家庭财产。

Key takeaway要点
This case is an important reminder that certain agreements, such as cohabitation agreements, can only protect you to a certain extent. If you and your partner make decisions or act in a way about a property that suggests that you are not relying on the cohabitation agreement, the courts may find that such property is outside the bounds of the cohabitation agreement. Make sure that you always keep in mind the terms of your agreement and follow those terms, especially when dealing with property ownership.

此案提醒我们，某些协议（例如同居协议）只能在一定程度上保护您。如果您和您的伴侣就财产做出的决定或采取的行为表明您不依赖同居协议，法院可能会认定此类财产超出了同居协议的范围。请确保您始终牢记协议条款并遵守这些条款，尤其是在处理财产所有权时。

In the end, the courts will care less about words in a document and more about the actual reality and facts surrounding your situation.

最后，相比文件中的文字，法庭更关心的是您的实际情况和事实。

Cases案例
Nicol v. Lau, 2024 BCSC 1866

Remmem v. Remmem, 2014 BCSC 1552
    `
  }
];


export default function Articles() {
  const [showModal, setShowModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    allArticlesData.length > 0 ? allArticlesData[0] : null
  );
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Hide navbar when modal is open
  useEffect(() => {
    setShowNavbar(!showModal);
  }, [showModal]);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeArticle = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };


  // Filter articles based on selected category
  const filteredArticles = selectedCategory === "All Categories"
    ? allArticlesData
    : allArticlesData.filter(article => article.category === selectedCategory);

  // Categories for the pills (derived from articles data)
  const categories = ["All Categories", ...Array.from(new Set(allArticlesData.map(article => article.category)))];

  // Use the first article as the featured article
  const featuredArticle = allArticlesData.length > 0 ? allArticlesData[0] : null;

  // --- Add the function to open the chatbot ---
  const openChatbot = (event: MouseEvent<HTMLAnchorElement>) => { // Use HTMLAnchorElement
    const icon = document.getElementById('chatbotIcon');
    const panel = document.getElementById('chatbotPanel');

    if (icon && panel) {
      console.log("Opening chatbot panel directly via button click (Articles Page).");
      panel.style.display = 'flex'; // Show panel
      icon.style.display = 'none';  // Hide icon

      // Set flag for the outside click listener in chatbot.js to ignore this event
      window.ignoreNextOutsideClick = true;

      // Optional: Try to focus input and scroll if the instance is available
      if (window.chatbotInstance && typeof window.chatbotInstance.focusInput === 'function') {
         window.chatbotInstance.focusInput();
      }
      if (window.chatbotInstance && typeof window.chatbotInstance.scrollToBottom === 'function') {
        window.chatbotInstance.scrollToBottom(true);
      }

    } else {
        console.error("Chatbot icon or panel element not found.");
    }
    // Prevent default anchor tag navigation
    event.preventDefault();
  };
  // --- End function ---

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Include NavBar at the top */}
      {showNavbar && <NavBar />}
      
      {/* Hero section with background */}
      <div className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 flex flex-col items-center justify-center text-center h-full">
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative" style={{ top: '10vh' }}>
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8">Legal Insights & Articles</h1>
            
            {/* Yellow decorative line */}
            <div className="h-[3px] w-[160px] md:w-[220px] bg-[#FFC107] mb-8 md:mb-12"></div>
            
            {/* Introduction text */}
            <p className="text-lg text-white/90 mb-8 md:mb-20">
              Expert-written articles on various legal topics to help you navigate complex legal matters. 
              Stay informed with our in-depth analyses, practical guides, and insightful perspectives.
            </p>
            
            
          </div>
        </div>
      </div>
      
      {/* Articles section */}
      <div id="articles-section" className="relative py-24">
        {/* Background for articles section */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-50" 
          />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">

          
          {/* More articles section */}
          <div>
            <div className="flex justify-start mb-12">
              {/* Categories UI with click handlers */}
              <div className="w-full">
                <div className="overflow-x-auto py-2 no-scrollbar">
                  <div className="flex space-x-2 md:space-x-3">
                    {categories.map((category) => (
                      <button 
                        key={category}
                        className={`${
                          selectedCategory === category 
                            ? 'bg-[#FFC107] text-black' 
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        } px-5 py-2.5 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add styles to hide scrollbar */}
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            {/* Article grid */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="rounded-xl overflow-hidden shadow-lg bg-gray-100 flex flex-col">
                    <div className="relative group">
                      {/* Image section */}
                      <div className="relative w-full h-[220px]">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-105"
                        />
                        {/* Read Article Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => openArticle(article)} // Use openArticle directly
                            className="bg-white text-black font-semibold py-2 px-4 rounded-md shadow-lg transform transition-all duration-300 hover:bg-[#FFC107] hover:scale-105 text-sm"
                          >
                            Read Article
                          </button>
                        </div>
                      </div>

                      {/* Text content section */}
                      <div className="p-5 flex-grow flex flex-col"> {/* Ensure flex-col */}
                      <div className="flex items-center mb-3">
                        <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                          {article.category}
                        </span>
                        <span className="ml-3 text-gray-500 text-xs">{article.date}</span>
                      </div>

                      {/* MODIFIED: Added min-height for title */}
                      <h3
                        className="text-lg font-bold mb-3 hover:text-[#FFC107] cursor-pointer transition-colors min-h-[4.5rem] flex items-center" // Added min-h and flex items-center
                        onClick={() => openArticle(article)}
                      >
                        <span>{article.title}</span> {/* Wrap title in span for vertical centering if needed */}
                      </h3>

                      {/* Use flex-grow to push author down */}
                      <p className="text-gray-700 mb-4 text-sm line-clamp-3 flex-grow">
                        {article.preview}
                      </p>

                      {/* Author info pushed to bottom */}
                      <div className="flex items-center mt-auto">
                        <Image src="/chatbot1.png" alt="Author" width={32} height={32} className="rounded-full mr-2" />
                        <div>
                          <p className="font-medium text-sm">{article.author}</p>
                          <p className="text-xs text-gray-500">{article.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action section */}
      <div className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/bigBG.png" 
            alt="Background" 
            fill 
            className="object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Have Legal Questions?</h2>
          <div className="h-[3px] w-[120px] bg-[#FFC107] mx-auto mb-12"></div>
          <p className="text-lg text-white leading-relaxed mb-12 max-w-2xl mx-auto">
            Our team is ready to provide expert advice tailored to your specific situation. 
            Reach out today for a consultation.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href="/#contact" 
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-transparent px-8 py-4 font-semibold text-white border-2 border-[#FFC107] transition-all duration-300 hover:bg-[#FFC107] hover:text-black focus:outline-none"
            >
              Contact Us
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a
              // href="/chat" // REMOVE href
              onClick={openChatbot} // ADD onClick
              role="button" // ADD role
              className="group relative inline-flex items-center justify-center gap-2 rounded-md bg-[#FFC107] px-8 py-4 font-semibold text-gray-900 transition-all duration-300 hover:bg-[#ffcb38] focus:outline-none cursor-pointer" // ADD cursor-pointer
            >
              Chat with Eve
              {/* ... svg ... */}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Article Modal/Canvas */}
      <AnimatePresence>
        {showModal && selectedArticle && ( // Ensure selectedArticle is not null
          <motion.div
            className="fixed inset-0 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={closeArticle}
            ></div>

            {/* Canvas */}
            <motion.div
              className="relative w-[72%] h-full bg-[#333333] overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Close Button */}
              <button
                onClick={closeArticle}
                className="absolute top-6 left-6 z-50 p-2 text-white hover:text-[#FFC107] transition-colors"
              >
                <X size={24} />
              </button>

              {/* Article Content */}
              <div className="p-16 pt-24 text-white max-w-4xl mx-auto">
                <div className="mb-8">
                  <span className="bg-[#FFC107] text-xs uppercase font-bold tracking-wide px-2 py-1 rounded text-black">
                    {selectedArticle.category}
                  </span>
                  <span className="ml-4 text-white/70 text-sm">{selectedArticle.date}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-8">{selectedArticle.title}</h1>

                <div className="flex items-center mb-12">
                  <Image
                    src="/chatbot1.png" // Placeholder author image - replace if needed
                    alt="Author"
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-white">{selectedArticle.author}</p>
                    <p className="text-sm text-white/70">{selectedArticle.role}</p>
                  </div>
                </div>

                {/* Article Body - splitting paragraphs */}
                {/* Make sure the placeholder content is inserted here */}
                <div className="prose prose-lg prose-invert max-w-none">
                  {selectedArticle.content === `<<< PASTE CONTENT FROM '${selectedArticle.id}. ${selectedArticle.title}.txt' HERE >>>`
                    ? <p className="mb-6 text-xl leading-relaxed italic text-gray-400">{selectedArticle.content}</p> // Display placeholder prominently
                    : selectedArticle.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className={`mb-6 ${i === 0 ? 'text-xl leading-relaxed' : 'leading-relaxed'}`}>
                          {paragraph}
                        </p>
                      ))
                  }
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}